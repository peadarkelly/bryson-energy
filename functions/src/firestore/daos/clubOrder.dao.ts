import { injectable } from 'inversify'
import { firestore as fire } from 'firebase-admin'
import { Context, BaseModel, ClubOrderModel } from '../../firestore/firestore.models'
import BaseDao from './base.dao'

@injectable()
export default class ClubOrderDao extends BaseDao<ClubOrderModel> {

  public async createClubOrder(ctx: Context, clubId: string, order: ClubOrderModel): Promise<BaseModel<ClubOrderModel>> {
    const orderRef: fire.DocumentReference = await ctx.firestore.collection('clubOrders').doc(clubId).collection('orders').add(order)
    const orderSnap: fire.DocumentSnapshot = await orderRef.get()

    return super.mapToResult(orderSnap)
  }

  public async getClubOrder(ctx: Context, clubId: string, orderId: string): Promise<BaseModel<ClubOrderModel>> {
    const orderSnap: fire.DocumentSnapshot = await ctx.firestore.collection('clubOrders').doc(clubId).collection('orders').doc(orderId).get()

    return super.mapToResult(orderSnap)
  }

  public async getClubOrders(ctx: Context, clubId: string): Promise<BaseModel<ClubOrderModel>[]> {
    const orderSnap: fire.QuerySnapshot = await ctx.firestore.collection('clubOrders').doc(clubId).collection('orders').get()

    return super.mapToCollectionResult(orderSnap)
  }

  public async updateOrderTotals(ctx: Context, clubId: string, orderId: string, order: ClubOrderModel, volume: number): Promise<void> {
    await ctx.firestore.collection('clubOrders').doc(clubId).collection('orders').doc(orderId).update({
      numberOfParticipants: order.numberOfParticipants + 1,
      totalVolume: order.totalVolume + volume
    })
  }
}
