import { describe, it, before } from 'mocha'
import { assert } from 'chai'
import { mock, instance, when, verify, anything } from 'ts-mockito'
import AddUserResolver from '../../../../src/api/resolvers/addUser.resolver'
import FirestoreMapper from '../../../../src/api/mappers/firestore.mapper'
import GraphqlMapper from '../../../../src/api/mappers/graphql.mapper'
import UserDao from '../../../../src/firestore/daos/user.dao'
import { CTX, toBaseModel } from '../../../fixtures/firestoreFixtures'
import { generateFirestoreUser, generateGraphQLUserInput, generateGraphQLUser } from '../../../fixtures/userFixtures'
import { AddUserMutationArgs, User } from '../../../../src/api/models/graphql.models'

describe('AddUserResolver', () => {

  let resolver: AddUserResolver

  let firestoreMapper: FirestoreMapper
  let graphqlMapper: GraphqlMapper
  let userDao: UserDao

  const ARGS: AddUserMutationArgs = { input: generateGraphQLUserInput() }

  before(() => {
    firestoreMapper = mock(FirestoreMapper)
    graphqlMapper = mock(GraphqlMapper)
    userDao = mock(UserDao)

    resolver = new AddUserResolver(
      instance(firestoreMapper),
      instance(graphqlMapper),
      instance(userDao)
    )
  })

  describe('resolve', () => {
    it('should throw an error if a user already exists with the supplied user ID', async () => {
      when(userDao.getUser(CTX, anything())).thenResolve(toBaseModel('someUserId', generateFirestoreUser()))

      try {
        await resolver.resolve(null, ARGS, CTX)
        assert.fail()
      } catch (err) {
        assert.exists(err, 'clubId does not exist')
      }
    })

    it('should add a user to the database', async () => {
      when(userDao.getUser(CTX, anything())).thenResolve(null)

      await resolver.resolve(null, ARGS, CTX)

      verify(userDao.getUser(CTX, anything())).called()
    })

    it('should return the created user', async () => {
      const user: User = generateGraphQLUser()

      when(userDao.getUser(CTX, anything())).thenResolve(null)
      when(graphqlMapper.mapToUser(anything(), anything())).thenReturn(user)

      const result: User = await resolver.resolve(null, ARGS, CTX)

      assert.equal(result, user)
    })
  })
})
