import { describe, it, before } from 'mocha'
import { assert } from 'chai'
import { mock, instance, when, anything, verify } from 'ts-mockito'
import AddClubResolver from '../../../../src/api/resolvers/addClub.resolver'
import FirestoreMapper from '../../../../src/api/mappers/firestore.mapper'
import GraphqlMapper from '../../../../src/api/mappers/graphql.mapper'
import UserDao from '../../../../src/firestore/daos/user.dao'
import ClubDao from '../../../../src/firestore/daos/club.dao'
import ClubUserDao from '../../../../src/firestore/daos/clubUser.dao'
import { CTX, toBaseModel } from '../../../fixtures/firestoreFixtures'
import { AddClubMutationArgs, Club } from '../../../../src/api/models/graphql.models'
import { UserModel } from '../../../../src/firestore/firestore.models'
import { generateFirestoreUser } from '../../../fixtures/userFixtures'
import { generateGraphQLClub } from '../../../fixtures/clubFixtures'

describe('AddClubResolver', () => {

  let resolver: AddClubResolver

  let firestoreMapper: FirestoreMapper
  let graphqlMapper: GraphqlMapper
  let userDao: UserDao
  let clubDao: ClubDao
  let clubUserDao: ClubUserDao

  const ARGS: AddClubMutationArgs = { adminId: 'someAdminId' }

  before(() => {
    firestoreMapper = mock(FirestoreMapper)
    graphqlMapper = mock(GraphqlMapper)
    userDao = mock(UserDao)
    clubDao = mock(ClubDao)
    clubUserDao = mock(ClubUserDao)

    resolver = new AddClubResolver(
      instance(firestoreMapper),
      instance(graphqlMapper),
      instance(userDao),
      instance(clubDao),
      instance(clubUserDao)
    )
  })

  describe('resolve', () => {
    it('should throw an error when no user exists with the supplied admin ID', async () => {
      when(userDao.getUser(CTX, 'someAdminId')).thenResolve(null)

      try {
        await resolver.resolve(null, ARGS, CTX)
        assert.fail()
      } catch (err) {
        assert.exists(err, 'user does not exist')
      }
    })

    it('should throw an error when the retrieved user already belongs to another club', async () => {
      const admin: UserModel = generateFirestoreUser()
      admin.clubId = 'someClubId'

      when(userDao.getUser(CTX, 'someAdminId')).thenResolve(toBaseModel('someAdminId', admin))

      try {
        await resolver.resolve(null, ARGS, CTX)
        assert.fail()
      } catch (err) {
        assert.exists(err, 'user is already a member of another club')
      }
    })

    it('should add a club to the database', async () => {
      const admin: UserModel = generateFirestoreUser()
      admin.clubId = null

      when(userDao.getUser(CTX, 'someAdminId')).thenResolve(toBaseModel('someAdminId', admin))
      when(clubDao.createClub(CTX, anything())).thenResolve(toBaseModel('someClubId', null))

      await resolver.resolve(null, ARGS, CTX)

      verify(clubDao.createClub(CTX, anything())).called()
    })

    it('should add assign the admin to the club in the database', async () => {
      const admin: UserModel = generateFirestoreUser()
      admin.clubId = null

      when(userDao.getUser(CTX, 'someAdminId')).thenResolve(toBaseModel('someAdminId', admin))
      when(clubDao.createClub(CTX, anything())).thenResolve(toBaseModel('someClubId', null))

      await resolver.resolve(null, ARGS, CTX)

      verify(clubUserDao.createClubUser(CTX, anything(), anything(), anything())).called()
    })

    it('should return the newly created club', async () => {
      const admin: UserModel = generateFirestoreUser()
      admin.clubId = null

      const club: Club = generateGraphQLClub()

      when(userDao.getUser(CTX, 'someAdminId')).thenResolve(toBaseModel('someAdminId', admin))
      when(clubDao.createClub(CTX, anything())).thenResolve(toBaseModel('someClubId', null))
      when(graphqlMapper.mapToClub(anything(), anything())).thenReturn(club)

      const result: Club = await resolver.resolve(null, ARGS, CTX)

      assert.equal(result, club)

      verify(clubUserDao.createClubUser(CTX, anything(), anything(), anything())).called()
    })
  })
})
