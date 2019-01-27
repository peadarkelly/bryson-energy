import { firestore as fire } from 'firebase-admin'
import { Context, UserModel, BaseModel, ClubUserModel } from '../models/firestore.models'
import { mapToCollectionResult } from '../mappers/firestore.mapper'

export async function createClubUser(ctx: Context, clubId: string, userId: string, user: UserModel): Promise<void> {
  await ctx.firestore.collection('clubUsers').doc(clubId).collection('users').doc(userId).set({ name: `${user.firstName} ${user.surname}` })
}

export async function getClubUsers(ctx: Context, clubId: string): Promise<BaseModel<ClubUserModel>[]> {
  const clubUsersSnap: fire.QuerySnapshot = await ctx.firestore.collection('clubUsers').doc(clubId).collection('users').get()

  return mapToCollectionResult<ClubUserModel>(clubUsersSnap)
}
