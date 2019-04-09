import { injectable } from 'inversify'
import { Context, BaseModel, ClubOrderModel } from '../../firestore/firestore.models'
import { Order, OrderQueryArgs } from '../models/graphql.models'
import Resolver from './resolver'
import GraphqlMapper from '../mappers/graphql.mapper'
import ClubOrderDao from '../../firestore/daos/clubOrder.dao'

@injectable()
export default class OrderResolver implements Resolver {

  public constructor(
    private graphqlMapper: GraphqlMapper,
    private clubOrderDao: ClubOrderDao
  ) {}

  public async resolve(parent: null, { clubId, orderId }: OrderQueryArgs, ctx: Context): Promise<Order> {
    const order: BaseModel<ClubOrderModel> = await this.clubOrderDao.getClubOrder(ctx, clubId, orderId)
    if (!order) {
      throw new Error('orderId does not exist')
    }

    return this.graphqlMapper.mapToOrder(order.id, order.data)
  }
}
