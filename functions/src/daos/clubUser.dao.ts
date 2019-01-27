import { injectable } from 'inversify'
import { firestore as fire } from 'firebase-admin'
import { Context, BaseModel, ClubUserModel } from '../models/firestore.models'
import BaseDao from './base.dao'

@injectable()
export default class ClubUserDao extends BaseDao<ClubUserModel> {

  public async createClubUser(ctx: Context, clubId: string, userId: string, clubUser: ClubUserModel): Promise<void> {
    await ctx.firestore.collection('clubUsers').doc(clubId).collection('users').doc(userId).set(clubUser)
  }

  public async getClubUsers(ctx: Context, clubId: string): Promise<BaseModel<ClubUserModel>[]> {
    const clubUsersSnap: fire.QuerySnapshot = await ctx.firestore.collection('clubUsers').doc(clubId).collection('users').get()

    return super.mapToCollectionResult(clubUsersSnap)
  }
}
