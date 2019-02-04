import moment from 'moment'
import { injectable } from 'inversify'
import { Order, OrderStatus } from '../models/graphql.models'
import Resolver from './resolver'

@injectable()
export default class OrderStatusResolver implements Resolver {

  public async resolve({ orderId, deliveryDate, deadlineDate }: Order): Promise<OrderStatus> {
    if (!orderId) {
      return null
    }

    const now: moment.Moment = moment()

    if (now.isAfter(moment(deliveryDate))) {
      return OrderStatus.Completed
    }

    if (now.isAfter(moment(deadlineDate))) {
      return OrderStatus.DeliveryDue
    }

    return OrderStatus.Open
  }
}
