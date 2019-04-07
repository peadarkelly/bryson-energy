import { describe, it, before } from 'mocha'
import { assert } from 'chai'
import { mock, instance, when, anything } from 'ts-mockito'
import UserClubResolver from '../../../../src/api/resolvers/userClub.resolver'
import GraphqlMapper from '../../../../src/api/mappers/graphql.mapper'
import ClubDao from '../../../../src/api/daos/club.dao'
import { Club, User } from '../../../../src/api/models/graphql.models'
import { CTX, toBaseModel } from '../../../fixtures/firestoreFixtures'
import { generateGraphQLUser } from '../../../fixtures/userFixtures'
import { generateFirestoreClub, generateGraphQLClub } from '../../../fixtures/clubFixtures'

describe('UserClubResolver', () => {

  let resolver: UserClubResolver

  let graphqlMapper: GraphqlMapper
  let clubDao: ClubDao

  before(() => {
    graphqlMapper = mock(GraphqlMapper)
    clubDao = mock(ClubDao)

    resolver = new UserClubResolver(
      instance(graphqlMapper),
      instance(clubDao)
    )
  })

  describe('resolve', () => {
    it('should return null if the parent user has not joined a club', async () => {
      const user: User = generateGraphQLUser()
      user.clubId = null

      const result: Club = await resolver.resolve(user, null, CTX)

      assert.isNull(result)
    })

    it('should return the club associated with the user', async () => {
      const user: User = generateGraphQLUser()
      user.clubId = 'someClubId'

      const club: Club = generateGraphQLClub()

      when(clubDao.getClub(CTX, 'someClubId')).thenResolve(toBaseModel('someClubId', generateFirestoreClub()))
      when(graphqlMapper.mapToClub(anything(), anything())).thenReturn(club)

      const result: Club = await resolver.resolve(user, null, CTX)

      assert.equal(result, club)
    })
  })
})
