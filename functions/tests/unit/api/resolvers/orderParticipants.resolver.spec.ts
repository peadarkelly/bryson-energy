import { describe, it, before } from 'mocha'
import { assert } from 'chai'
import { mock, instance, when, anything } from 'ts-mockito'
import OrderParticipantsResolver from '../../../../src/api/resolvers/orderParticipants.resolver'
import GraphqlMapper from '../../../../src/api/mappers/graphql.mapper'
import OrderUserDao from '../../../../src/api/daos/orderUser.dao'
import { OrderParticipant, Order } from '../../../../src/api/models/graphql.models';
import { CTX, toBaseModel } from '../../../fixtures/firestoreFixtures';
import { generateGraphQLOrder, generateFirestoreOrderUser, generateGraphQLOrderParticipant } from '../../../fixtures/orderFixtures';

describe('OrderParticipantsResolver', () => {

  let resolver: OrderParticipantsResolver

  let graphqlMapper: GraphqlMapper
  let orderUserDao: OrderUserDao

  before(() => {
    graphqlMapper = mock(GraphqlMapper)
    orderUserDao = mock(OrderUserDao)

    resolver = new OrderParticipantsResolver(
      instance(graphqlMapper),
      instance(orderUserDao)
    )
  })

  describe('resolve', () => {
    it('should return an empty list if the parent order does not exist', async () => {
      const order: Order = generateGraphQLOrder()
      order.orderId = null

      const result: OrderParticipant[] = await resolver.resolve(order, null, CTX)

      assert.isEmpty(result)
    })

    it('should return the retrieved order participants', async () => {
      const order: Order = generateGraphQLOrder()
      order.orderId = 'someOrderId'

      const orderParticipant: OrderParticipant = generateGraphQLOrderParticipant()

      when(orderUserDao.getOrderUsers(CTX, anything())).thenResolve([toBaseModel('someUserId', generateFirestoreOrderUser())])
      when(graphqlMapper.mapToOrderParticipant(anything(), anything())).thenReturn(orderParticipant)

      const result: OrderParticipant[] = await resolver.resolve(order, null, CTX)

      assert.equal(result.length, 1)
      assert.equal(result[0], orderParticipant)
    })
  })
})
