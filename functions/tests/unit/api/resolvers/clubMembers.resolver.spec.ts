import { describe, it, before } from 'mocha'
import { assert } from 'chai'
import { mock, instance, when, anything } from 'ts-mockito'
import ClubMembersResolver from '../../../../src/api/resolvers/clubMembers.resolver'
import GraphqlMapper from '../../../../src/api/mappers/graphql.mapper'
import ClubUserDao from '../../../../src/firestore/daos/clubUser.dao'
import { ClubMember, Club } from '../../../../src/api/models/graphql.models'
import { CTX, toBaseModel } from '../../../fixtures/firestoreFixtures'
import { generateGraphQLClub, generateFirestoreClubUser, generateGraphQLClubMember } from '../../../fixtures/clubFixtures'

describe('ClubMembersResolver', () => {

  let resolver: ClubMembersResolver

  let graphqlMapper: GraphqlMapper
  let clubUserDao: ClubUserDao

  before(() => {
    graphqlMapper = mock(GraphqlMapper)
    clubUserDao = mock(ClubUserDao)

    resolver = new ClubMembersResolver(
      instance(graphqlMapper),
      instance(clubUserDao)
    )
  })

  describe('resolve', () => {
    it('should return an empty list if the parent club does not exist', async () => {
      const club: Club = generateGraphQLClub()
      club.clubId = null

      const result: ClubMember[] = await resolver.resolve(club, null, CTX)

      assert.isEmpty(result)
    })

    it('should return a list of club members belonging to the parent club', async () => {
      const club: Club = generateGraphQLClub()
      club.clubId = 'someClubId'

      const clubMember: ClubMember = generateGraphQLClubMember()

      when(clubUserDao.getClubUsers(CTX, 'someClubId')).thenResolve([toBaseModel('someUserId', generateFirestoreClubUser())])
      when(graphqlMapper.mapToClubMember(anything(), anything())).thenReturn(clubMember)

      const result: ClubMember[] = await resolver.resolve(club, null, CTX)

      assert.equal(result.length, 1)
      assert.equal(result[0], clubMember)
    })
  })
})
