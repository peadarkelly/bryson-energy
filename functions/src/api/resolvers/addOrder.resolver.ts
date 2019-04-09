import { injectable } from 'inversify'
import { Context, BaseModel, ClubOrderModel } from '../../firestore/firestore.models'
import { AddOrderMutationArgs, Order } from '../models/graphql.models'
import Resolver from './resolver'
import FirestoreMapper from '../mappers/firestore.mapper'
import GraphqlMapper from '../mappers/graphql.mapper'
import ClubDao from '../../firestore/daos/club.dao'
import ClubOrderDao from '../../firestore/daos/clubOrder.dao'

@injectable()
export default class AddOrderResolver implements Resolver {

  public constructor(
    private firestoreMapper: FirestoreMapper,
    private graphqlMapper: GraphqlMapper,
    private clubDao: ClubDao,
    private clubOrderDao: ClubOrderDao
  ) {}

  public async resolve(parent: null, { input }: AddOrderMutationArgs, ctx: Context): Promise<Order> {
    if (!(await this.clubDao.getClub(ctx, input.clubId))) {
      throw new Error('clubId does not exist')
    }

    const clubOrder: BaseModel<ClubOrderModel> = await this.clubOrderDao.createClubOrder(ctx, input.clubId, this.firestoreMapper.mapToClubOrderModel(input))

    return this.graphqlMapper.mapToOrder(clubOrder.id, clubOrder.data)
  }
}
