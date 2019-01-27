import { firestore as fire } from 'firebase-admin'
import { Context, UserModel, BaseModel } from '../models/firestore.models'
import { mapToResult } from '../mappers/firestore.mapper'

export async function createUser(ctx: Context, userId: string, user: UserModel): Promise<void> {
  await ctx.firestore.collection('users').doc(userId).set(user)
}

export async function getUser(ctx: Context, userId: string): Promise<BaseModel<UserModel>> {
  const userSnap: fire.DocumentSnapshot = await ctx.firestore.collection('users').doc(userId).get()

  if (!userSnap.exists) {
    return null
  }

  return mapToResult(userSnap)
}

export async function updateUserClubId(ctx: Context, userId: string, clubId: string): Promise<void> {
  await ctx.firestore.collection('users').doc(userId).update({ clubId: clubId })
}