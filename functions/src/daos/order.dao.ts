import { injectable } from 'inversify'
import { firestore as fire } from 'firebase-admin'
import { Context, BaseModel, ClubOrderModel } from '../models/firestore.models'
import BaseDao from './base.dao'

@injectable()
export default class ClubOrderDao extends BaseDao<ClubOrderModel> {

  public async createClubOrder(ctx: Context, clubId: string, order: ClubOrderModel): Promise<BaseModel<ClubOrderModel>> {
    const orderRef: fire.DocumentReference = await ctx.firestore.collection('clubOrders').doc(clubId).collection('orders').add(order)
    const orderSnap: fire.DocumentSnapshot = await orderRef.get()

    return super.mapToResult(orderSnap)
  }
}
