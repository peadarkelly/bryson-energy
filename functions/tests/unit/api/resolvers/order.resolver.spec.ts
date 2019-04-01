import { describe, it, before } from 'mocha'
import { assert } from 'chai'
import { mock, instance, when, anything } from 'ts-mockito'
import OrderResolver from '../../../../src/api/resolvers/order.resolver'
import GraphqlMapper from '../../../../src/api/mappers/graphql.mapper'
import ClubOrderDao from '../../../../src/api/daos/clubOrder.dao'
import { CTX, toBaseModel } from '../../../fixtures/firestoreFixtures'
import { OrderQueryArgs, Order } from '../../../../src/api/models/graphql.models';
import { generateFirestoreClubOrder, generateGraphQLOrder } from '../../../fixtures/orderFixtures'

describe('OrderResolver', () => {

  let resolver: OrderResolver

  let graphqlMapper: GraphqlMapper
  let clubOrderDao: ClubOrderDao

  const ARGS: OrderQueryArgs = {
    clubId: 'someClubId',
    orderId: 'someOrderId'
  }

  before(() => {
    graphqlMapper = mock(GraphqlMapper)
    clubOrderDao = mock(ClubOrderDao)

    resolver = new OrderResolver(
      instance(graphqlMapper),
      instance(clubOrderDao)
    )
  })

  describe('resolve', () => {
    it('should throw an error if no club order exists with the supplied club ID and order ID', async () => {
      when(clubOrderDao.getClubOrder(CTX, anything(), anything())).thenResolve(null)

      try {
        await resolver.resolve(null, ARGS, CTX)
      } catch (err) {
        assert.exists(err, 'orderId does not exist')
      }
    })

    it('should throw an error if no club order exists with the supplied club ID and order ID', async () => {
      const order: Order = generateGraphQLOrder()

      when(clubOrderDao.getClubOrder(CTX, anything(), anything())).thenResolve(toBaseModel('someOrderId', generateFirestoreClubOrder()))
      when(graphqlMapper.mapToOrder(anything(), anything())).thenReturn(order)

      const result: Order = await resolver.resolve(null, ARGS, CTX)

      assert.equal(result, order)
    })
  })
})
