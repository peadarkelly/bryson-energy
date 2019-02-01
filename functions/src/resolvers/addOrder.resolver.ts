import { injectable } from 'inversify'
import { Context, BaseModel, ClubOrderModel } from '../models/firestore.models'
import { AddOrderMutationArgs, Order } from '../models/graphql.models'
import Resolver from './resolver'
import FirestoreMapper from '../mappers/firestore.mapper'
import GraphqlMapper from '../mappers/graphql.mapper'
import ClubDao from '../daos/club.dao'
import ClubOrderDao from '../daos/clubOrder.dao'

@injectable()
export default class AddOrderResolver implements Resolver {

  public constructor(
    private firestoreMapper: FirestoreMapper,
    private graphqlMapper: GraphqlMapper,
    private clubDao: ClubDao,
    private clubOrderDao: ClubOrderDao
  ) {}

  public async resolve(parent: null, { clubId, deadlineDate }: AddOrderMutationArgs, ctx: Context): Promise<Order> {
    if (!(await this.clubDao.getClub(ctx, clubId))) {
      throw new Error('clubId does not exist')
    }

    const clubOrder: BaseModel<ClubOrderModel> = await this.clubOrderDao.createClubOrder(ctx, clubId, this.firestoreMapper.mapToClubOrderModel(new Date(deadlineDate)))

    return this.graphqlMapper.mapToOrder(clubOrder.id, clubOrder.data)
  }
}
