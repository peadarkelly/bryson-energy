import { injectable } from 'inversify'
import { Context, BaseModel, ClubOrderModel } from '../../firestore/firestore.models'
import { Order, Club } from '../models/graphql.models'
import Resolver from './resolver'
import GraphqlMapper from '../mappers/graphql.mapper'
import ClubOrderDao from '../../firestore/daos/clubOrder.dao'

@injectable()
export default class ClubOrdersResolver implements Resolver {

  public constructor(
    private graphqlMapper: GraphqlMapper,
    private clubOrderDao: ClubOrderDao
  ) {}

  public async resolve({ clubId }: Club, args: any, ctx: Context): Promise<Order[]> {
    if (!clubId) {
      return []
    }

    const clubOrders: BaseModel<ClubOrderModel>[] = await this.clubOrderDao.getClubOrders(ctx, clubId)

    return clubOrders.map(clubOrder => this.graphqlMapper.mapToOrder(clubOrder.id, clubOrder.data))
  }
}
