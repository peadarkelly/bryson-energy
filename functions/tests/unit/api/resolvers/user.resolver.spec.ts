import { describe, it, before } from 'mocha'
import { assert } from 'chai'
import { mock, instance, when, anything } from 'ts-mockito'
import UserResolver from '../../../../src/api/resolvers/user.resolver'
import GraphqlMapper from '../../../../src/api/mappers/graphql.mapper'
import UserDao from '../../../../src/firestore/daos/user.dao'
import { CTX, toBaseModel } from '../../../fixtures/firestoreFixtures'
import { UserQueryArgs, User } from '../../../../src/api/models/graphql.models'
import { generateGraphQLUser } from '../../../fixtures/userFixtures'

describe('UserResolver', () => {

  let resolver: UserResolver

  let graphqlMapper: GraphqlMapper
  let userDao: UserDao

  const ARGS: UserQueryArgs = { userId: 'someUserId' }

  before(() => {
    graphqlMapper = mock(GraphqlMapper)
    userDao = mock(UserDao)

    resolver = new UserResolver(
      instance(graphqlMapper),
      instance(userDao)
    )
  })

  describe('resolve', () => {
    it('should throw an error if no user exists with the supplied user ID', async () => {
      when(userDao.getUser(CTX, 'someUserId')).thenResolve(null)

      try {
        await resolver.resolve(null, ARGS, CTX)
        assert.fail()
      } catch (err) {
        assert.exists(err, 'User not found')
      }
    })

    it('should returned the retrieved user', async () => {
      const user: User = generateGraphQLUser()

      when(userDao.getUser(CTX, 'someUserId')).thenResolve(toBaseModel('someUserId', generateGraphQLUser()))
      when(graphqlMapper.mapToUser(anything(), anything())).thenReturn(user)

      const result: User = await resolver.resolve(null, ARGS, CTX)

      assert.equal(result, user)
    })
  })
})
