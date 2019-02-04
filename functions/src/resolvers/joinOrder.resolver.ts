import { injectable } from 'inversify'
import { Context, BaseModel, ClubOrderModel, UserModel } from '../models/firestore.models'
import { JoinOrderMutationArgs, Order } from '../models/graphql.models'
import Resolver from './resolver'
import FirestoreMapper from '../mappers/firestore.mapper'
import GraphqlMapper from '../mappers/graphql.mapper'
import UserDao from '../daos/user.dao'
import ClubOrderDao from '../daos/clubOrder.dao'
import OrderUserDao from '../daos/orderUser.dao'

@injectable()
export default class JoinOrderResolver implements Resolver {

  public constructor(
    private firestoreMapper: FirestoreMapper,
    private graphqlMapper: GraphqlMapper,
    private userDao: UserDao,
    private clubOrderDao: ClubOrderDao,
    private orderUserDao: OrderUserDao
  ) {}

  public async resolve(parent: null, { input }: JoinOrderMutationArgs, ctx: Context): Promise<Order> {
    const user: BaseModel<UserModel> = await this.userDao.getUser(ctx, input.userId)
    if (!user) {
      throw new Error('userId does not exist')
    }

    const orderId: string = input.orderId
    const clubOrder: BaseModel<ClubOrderModel> = await this.clubOrderDao.getClubOrder(ctx, user.data.clubId, orderId)
    if (!clubOrder) {
      throw new Error('orderId does not exist')
    }

    await this.orderUserDao.createOrderUser(ctx, orderId, user.id, this.firestoreMapper.mapToOrderUserModel(user.data, input))
    await this.clubOrderDao.updateOrderTotals(ctx, user.data.clubId, orderId, clubOrder.data, input.volume)

    const updatedClubOrder: BaseModel<ClubOrderModel> = await this.clubOrderDao.getClubOrder(ctx, user.data.clubId, orderId)

    return this.graphqlMapper.mapToOrder(updatedClubOrder.id, updatedClubOrder.data)
  }
}
