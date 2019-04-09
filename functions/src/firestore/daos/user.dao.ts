import { injectable } from 'inversify'
import { firestore as fire } from 'firebase-admin'
import { Context, BaseModel, UserModel } from '../../firestore/firestore.models'
import BaseDao from './base.dao'

@injectable()
export default class UserDao extends BaseDao<UserModel> {

  public async createUser(ctx: Context, userId: string, user: UserModel): Promise<void> {
    await ctx.firestore.collection('users').doc(userId).set(user)
  }

  public async getUser(ctx: Context, userId: string): Promise<BaseModel<UserModel>> {
    const userSnap: fire.DocumentSnapshot = await ctx.firestore.collection('users').doc(userId).get()

    if (!userSnap.exists) {
      return null
    }

    return super.mapToResult(userSnap)
  }

  public async updateUserClubId(ctx: Context, userId: string, clubId: string): Promise<void> {
    await ctx.firestore.collection('users').doc(userId).update({ clubId: clubId })
  }
}
