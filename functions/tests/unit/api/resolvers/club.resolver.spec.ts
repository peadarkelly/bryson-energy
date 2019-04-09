import { describe, it, before } from 'mocha'
import { assert } from 'chai'
import { mock, instance, when, anything } from 'ts-mockito'
import ClubResolver from '../../../../src/api/resolvers/club.resolver'
import GraphqlMapper from '../../../../src/api/mappers/graphql.mapper'
import ClubDao from '../../../../src/firestore/daos/club.dao'
import { CTX, toBaseModel } from '../../../fixtures/firestoreFixtures'
import { ClubQueryArgs, Club } from '../../../../src/api/models/graphql.models'
import { generateGraphQLClub, generateFirestoreClub } from '../../../fixtures/clubFixtures'

describe('ClubResolver', () => {

  let resolver: ClubResolver

  let graphqlMapper: GraphqlMapper
  let clubDao: ClubDao

  const ARGS: ClubQueryArgs = { clubId: 'someClubId' }

  before(() => {
    graphqlMapper = mock(GraphqlMapper)
    clubDao = mock(ClubDao)

    resolver = new ClubResolver(
      instance(graphqlMapper),
      instance(clubDao)
    )
  })

  describe('resolve', () => {
    it('should throw an error if no club exists with the supplied club ID', async () => {
      when(clubDao.getClub(CTX, anything())).thenResolve(null)

      try {
        await resolver.resolve(null, ARGS, CTX)
        assert.fail()
      } catch (err) {
        assert.exists(err, 'clubId does not exist')
      }
    })

    it('should return the retrieved club', async () => {
      const club: Club = generateGraphQLClub()

      when(clubDao.getClub(CTX, anything())).thenResolve(toBaseModel('someClubId', generateFirestoreClub()))
      when(graphqlMapper.mapToClub(anything(), anything())).thenReturn(club)

      const result: Club = await resolver.resolve(null, ARGS, CTX)

      assert.equal(result, club)
    })
  })
})
