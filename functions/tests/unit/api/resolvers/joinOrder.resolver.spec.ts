import { describe, it } from 'mocha'
import { assert } from 'chai'
import { mock, instance, when, verify, anything } from 'ts-mockito'
import JoinOrderResolver from '../../../../src/api/resolvers/joinOrder.resolver'
import FirestoreMapper from '../../../../src/api/mappers/firestore.mapper'
import GraphqlMapper from '../../../../src/api/mappers/graphql.mapper'
import UserDao from '../../../../src/firestore/daos/user.dao'
import ClubOrderDao from '../../../../src/firestore/daos/clubOrder.dao'
import OrderUserDao from '../../../../src/firestore/daos/orderUser.dao'
import { CTX, toBaseModel } from '../../../fixtures/firestoreFixtures'
import { generateGraphQLJoinOrderInput, generateFirestoreClubOrder, generateGraphQLOrder } from '../../../fixtures/orderFixtures'
import { JoinOrderMutationArgs, Order } from '../../../../src/api/models/graphql.models'
import { generateFirestoreUser } from '../../../fixtures/userFixtures'

describe('JoinOrderResolver', () => {

  let resolver: JoinOrderResolver

  let firestoreMapper: FirestoreMapper
  let graphqlMapper: GraphqlMapper
  let userDao: UserDao
  let clubOrderDao: ClubOrderDao
  let orderUserDao: OrderUserDao

  const ARGS: JoinOrderMutationArgs = { input: generateGraphQLJoinOrderInput() }

  before(() => {
    firestoreMapper = mock(FirestoreMapper)
    graphqlMapper = mock(GraphqlMapper)
    userDao = mock(UserDao)
    clubOrderDao = mock(ClubOrderDao)
    orderUserDao = mock(OrderUserDao)

    resolver = new JoinOrderResolver(
      instance(firestoreMapper),
      instance(graphqlMapper),
      instance(userDao),
      instance(clubOrderDao),
      instance(orderUserDao)
    )
  })

  describe('resolve', () => {
    it('should throw an error when no user exists with the supplied user ID', async () => {
      when(userDao.getUser(CTX, anything())).thenResolve(null)

      try {
        await resolver.resolve(null, ARGS, CTX)
        assert.fail()
      } catch (err) {
        assert.exists(err, 'userId does not exist')
      }
    })

    it('should throw an error when no order exists with the supplied order ID', async () => {
      when(userDao.getUser(CTX, anything())).thenResolve(toBaseModel('someUserId', generateFirestoreUser()))
      when(clubOrderDao.getClubOrder(CTX, anything(), anything())).thenResolve(null)

      try {
        await resolver.resolve(null, ARGS, CTX)
        assert.fail()
      } catch (err) {
        assert.exists(err, 'orderId does not exist')
      }
    })

    it('should add the user to the order', async () => {
      when(userDao.getUser(CTX, anything())).thenResolve(toBaseModel('someUserId', generateFirestoreUser()))
      when(clubOrderDao.getClubOrder(CTX, anything(), anything())).thenResolve(toBaseModel('someOrderId', generateFirestoreClubOrder()))

      await resolver.resolve(null, ARGS, CTX)

      verify(orderUserDao.createOrderUser(CTX, anything(), anything(), anything())).called()
      verify(clubOrderDao.updateOrderTotals(CTX, anything(), anything(), anything(), anything())).called()
    })

    it('should return the updated order', async () => {
      const order: Order = generateGraphQLOrder()

      when(userDao.getUser(CTX, anything())).thenResolve(toBaseModel('someUserId', generateFirestoreUser()))
      when(clubOrderDao.getClubOrder(CTX, anything(), anything())).thenResolve(toBaseModel('someOrderId', generateFirestoreClubOrder()))
      when(graphqlMapper.mapToOrder(anything(), anything())).thenReturn(order)

      const result: Order = await resolver.resolve(null, ARGS, CTX)

      assert.equal(result, order)
    })
  })
})
