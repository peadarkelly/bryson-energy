import { injectable } from 'inversify'
import { Context, BaseModel, OrderUserModel } from '../../firestore/firestore.models'
import { OrderParticipant, Order } from '../models/graphql.models'
import Resolver from './resolver'
import GraphqlMapper from '../mappers/graphql.mapper'
import OrderUserDao from '../../firestore/daos/orderUser.dao'

@injectable()
export default class OrderParticipantsResolver implements Resolver {

  public constructor(
    private graphqlMapper: GraphqlMapper,
    private orderUserDao: OrderUserDao
  ) {}

  public async resolve({ orderId }: Order, args: any, ctx: Context): Promise<OrderParticipant[]> {
    if (!orderId) {
      return []
    }

    const orderUsers: BaseModel<OrderUserModel>[] = await this.orderUserDao.getOrderUsers(ctx, orderId)

    return orderUsers.map(orderUser => this.graphqlMapper.mapToOrderParticipant(orderUser.id, orderUser.data))
  }
}
