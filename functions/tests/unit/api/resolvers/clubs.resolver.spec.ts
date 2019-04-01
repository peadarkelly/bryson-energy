import { describe, it } from 'mocha'
import { assert } from 'chai'
import { mock, instance, when, anything } from 'ts-mockito'
import ClubsResolver from '../../../../src/api/resolvers/clubs.resolver'
import GraphqlMapper from '../../../../src/api/mappers/graphql.mapper'
import UserDao from '../../../../src/api/daos/user.dao'
import ClubDao from '../../../../src/api/daos/club.dao'
import { DistanceMatrixResponse, ClientResponse, DistanceMatrixRowElement, Distance } from '@google/maps'
import { getGoogleClient } from '../../../fixtures/googleFixtures'
import { CTX, toBaseModel } from '../../../fixtures/firestoreFixtures'
import { generateFirestoreUser } from '../../../fixtures/userFixtures'
import { generateFirestoreClub, generateGraphQLClub } from '../../../fixtures/clubFixtures'
import { ClubsQueryArgs, Club } from '../../../../src/api/models/graphql.models'
import { ClubModel, BaseModel } from '../../../../src/api/models/firestore.models';

describe('ClubsResolver', () => {

  let resolver: ClubsResolver

  let graphqlMapper: GraphqlMapper
  let userDao: UserDao
  let clubDao: ClubDao

  const ARGS: ClubsQueryArgs = { userId: 'someUserId' }

  const results: ClientResponse<DistanceMatrixResponse> = setupClientResponse()

  function setupClientResponse(): ClientResponse<DistanceMatrixResponse> {
    const elements: DistanceMatrixRowElement[] = [
      generateRow(100),
      generateRow(10000),
      generateRow(5000),
      generateRow(4999),
      generateRow(8000),
      generateRow(1000),
      generateRow(1600),
      generateRow(6000),
      generateRow(7000),
      generateRow(8000),
    ]

    const json: DistanceMatrixResponse = <DistanceMatrixResponse>{
      rows: [{
        elements: elements
      }]
    }

    return <ClientResponse<DistanceMatrixResponse>>{
      json: json
    }
  }

  function generateRow(distance: number): DistanceMatrixRowElement {
    return  <DistanceMatrixRowElement>{ distance: <Distance>{ value: distance } }
  }

  before(() => {
    graphqlMapper = mock(GraphqlMapper)
    userDao = mock(UserDao)
    clubDao = mock(ClubDao)

    resolver = new ClubsResolver(
      instance(graphqlMapper),
      instance(userDao),
      instance(clubDao),
      getGoogleClient(results)
    )
  })

  describe('resolve', () => {
    it('should throw an error if no user exists with the supplied user ID', async () => {
      when(userDao.getUser(CTX, 'someUserId')).thenResolve(null)

      try {
        await resolver.resolve(null, ARGS, CTX)
        assert.fail()
      } catch (err) {
        assert.exists(err, 'userId does not exist')
      }
    })

    it('should return an empty list if no clubs exist in the database', async () => {
      when(userDao.getUser(CTX, 'someUserId')).thenResolve(toBaseModel('someUserId', generateFirestoreUser()))
      when(clubDao.getClubs(CTX)).thenResolve([])

      const result: Club[] = await resolver.resolve(null, ARGS, CTX)

      assert.isEmpty(result)
    })

    it('should return a list of clubs within five kilometres', async () => {
      const clubs: BaseModel<ClubModel>[] = []

      for (let i = 0; i < 10; i++) {
        clubs.push(toBaseModel('someClubId', generateFirestoreClub()))
      }

      when(userDao.getUser(CTX, 'someUserId')).thenResolve(toBaseModel('someUserId', generateFirestoreUser()))
      when(clubDao.getClubs(CTX)).thenResolve(clubs)
      when(graphqlMapper.mapToClub(anything(), anything())).thenReturn(generateGraphQLClub())

      const result: Club[] = await resolver.resolve(null, ARGS, CTX)

      assert.equal(result.length, 5)
    })
  })
})
