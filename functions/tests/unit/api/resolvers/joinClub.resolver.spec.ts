import { describe, it, before } from 'mocha'
import { assert } from 'chai'
import { mock, instance, when, verify, anything } from 'ts-mockito'
import JoinClubResolver from '../../../../src/api/resolvers/joinClub.resolver'
import FirestoreMapper from '../../../../src/api/mappers/firestore.mapper'
import GraphqlMapper from '../../../../src/api/mappers/graphql.mapper'
import UserDao from '../../../../src/api/daos/user.dao'
import ClubDao from '../../../../src/api/daos/club.dao'
import ClubUserDao from '../../../../src/api/daos/clubUser.dao'
import { JoinClubMutationArgs, User } from '../../../../src/api/models/graphql.models'
import { CTX, toBaseModel } from '../../../fixtures/firestoreFixtures'
import { generateFirestoreClub } from '../../../fixtures/clubFixtures'
import { generateFirestoreUser, generateGraphQLUser } from '../../../fixtures/userFixtures'
import { UserModel } from '../../../../src/api/models/firestore.models'

describe('JoinClubResolver', () => {

  let resolver: JoinClubResolver

  let firestoreMapper: FirestoreMapper
  let graphqlMapper: GraphqlMapper
  let userDao: UserDao
  let clubDao: ClubDao
  let clubUserDao: ClubUserDao

  const ARGS: JoinClubMutationArgs = {
    userId: 'someUserId',
    clubId: 'someClubId'
  }

  before(() => {
    firestoreMapper = mock(FirestoreMapper)
    graphqlMapper = mock(GraphqlMapper)
    userDao = mock(UserDao)
    clubDao = mock(ClubDao)
    clubUserDao = mock(ClubUserDao)

    resolver = new JoinClubResolver(
      instance(firestoreMapper),
      instance(graphqlMapper),
      instance(userDao),
      instance(clubDao),
      instance(clubUserDao)
    )
  })

  describe('resolve', () => {
    it('should throw an error when no club exists with the supplied club ID', async () => {
      when(clubDao.getClub(CTX, 'someClubId')).thenResolve(null)

      try {
        await resolver.resolve(null, ARGS, CTX)
        assert.fail()
      } catch (err) {
        assert.exists(err, 'clubId does not exist')
      }
    })

    it('should throw an error when no user exists with the supplied user ID', async () => {
      when(clubDao.getClub(CTX, 'someClubId')).thenResolve(toBaseModel('someClubId', generateFirestoreClub()))
      when(userDao.getUser(CTX, 'someUserId')).thenResolve(null)

      try {
        await resolver.resolve(null, ARGS, CTX)
        assert.fail()
      } catch (err) {
        assert.exists(err, 'userId does not exist')
      }
    })

    it('should throw an error when user has already joined a club', async () => {
      const user: UserModel = generateFirestoreUser()
      user.clubId = 'someClubId'

      when(clubDao.getClub(CTX, 'someClubId')).thenResolve(toBaseModel('someClubId', generateFirestoreClub()))
      when(userDao.getUser(CTX, 'someUserId')).thenResolve(toBaseModel('someUserId', user))

      try {
        await resolver.resolve(null, ARGS, CTX)
        assert.fail()
      } catch (err) {
        assert.exists(err, 'user has already joined a club')
      }
    })

    it('should add the user to the club', async () => {
      const user: UserModel = generateFirestoreUser()
      user.clubId = null

      when(clubDao.getClub(CTX, 'someClubId')).thenResolve(toBaseModel('someClubId', generateFirestoreClub()))
      when(userDao.getUser(CTX, 'someUserId')).thenResolve(toBaseModel('someUserId', user))

      await resolver.resolve(null, ARGS, CTX)

      verify(userDao.updateUserClubId(CTX, anything(), anything())).called()
      verify(clubUserDao.createClubUser(CTX, anything(), anything(), anything())).called()
      verify(clubDao.incrementNumberOfMembers(CTX, anything(), anything())).called()
    })

    it('should add the user to the club', async () => {
      const user: UserModel = generateFirestoreUser()
      user.clubId = null

      const mappedUser: User = generateGraphQLUser()

      when(clubDao.getClub(CTX, 'someClubId')).thenResolve(toBaseModel('someClubId', generateFirestoreClub()))
      when(userDao.getUser(CTX, 'someUserId')).thenResolve(toBaseModel('someUserId', user))
      when(graphqlMapper.mapToUser(anything(), anything())).thenReturn(mappedUser)

      const result: User = await resolver.resolve(null, ARGS, CTX)

      assert.equal(result, mappedUser)
    })
  })
})
