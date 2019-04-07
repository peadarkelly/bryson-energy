import { describe, it } from 'mocha'
import { assert } from 'chai'
import OrderStatusResolver from '../../../../src/api/resolvers/orderStatus.resolver'
import { OrderStatus, Order } from '../../../../src/api/models/graphql.models'
import { generateGraphQLOrder } from '../../../fixtures/orderFixtures'
import moment from 'moment'

describe('OrderStatusResolver', () => {

  const resolver: OrderStatusResolver = new OrderStatusResolver()

  describe('resolve', () => {
    it('should return null if the parent order doesnt exist', async () => {
      const order: Order = generateGraphQLOrder()
      order.orderId = null

      const result: OrderStatus = await resolver.resolve(order)

      assert.isNull(result)
    })

    it('should return completed if the delivery date is in the past', async () => {
      const order: Order = generateGraphQLOrder()
      order.deliveryDate = moment().subtract(1, 'day').toDate().toISOString()

      const result: OrderStatus = await resolver.resolve(order)

      assert.equal(result, OrderStatus.Completed)
    })

    it('should return delivery due if the delivery date is in the future but the deadline date is in the past', async () => {
      const order: Order = generateGraphQLOrder()
      order.deliveryDate = moment().add(1, 'day').toDate().toISOString()
      order.deadlineDate = moment().subtract(1, 'day').toDate().toISOString()

      const result: OrderStatus = await resolver.resolve(order)

      assert.equal(result, OrderStatus.DeliveryDue)
    })

    it('should return open if the delivery date is in the past', async () => {
      const order: Order = generateGraphQLOrder()
      order.deliveryDate = moment().add(4, 'day').toDate().toISOString()
      order.deadlineDate = moment().add(1, 'day').toDate().toISOString()

      const result: OrderStatus = await resolver.resolve(order)

      assert.equal(result, OrderStatus.Open)
    })
  })
})
