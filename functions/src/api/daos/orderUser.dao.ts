import { injectable } from 'inversify'
import { firestore as fire } from 'firebase-admin'
import { Context, BaseModel, OrderUserModel } from '../models/firestore.models'
import BaseDao from './base.dao'

@injectable()
export default class OrderUserDao extends BaseDao<OrderUserModel> {

  public async createOrderUser(ctx: Context, orderId: string, userId: string, orderUser: OrderUserModel): Promise<void> {
    await ctx.firestore.collection('orderUsers').doc(orderId).collection('users').doc(userId).set(orderUser)
  }

  public async getOrderUsers(ctx: Context, orderId: string): Promise<BaseModel<OrderUserModel>[]> {
    const orderUsersSnap: fire.QuerySnapshot = await ctx.firestore.collection('orderUsers').doc(orderId).collection('users').get()

    return super.mapToCollectionResult(orderUsersSnap)
  }
}
