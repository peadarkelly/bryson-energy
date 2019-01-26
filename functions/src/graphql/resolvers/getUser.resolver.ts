import { firestore as fire } from 'firebase-admin'
import { User } from '../models'
import { mapToUserResponse } from '../mappers'

export default async function (parent: any, { userId }: any, ctx: { firestore: fire.Firestore }): Promise<User> {
  const userSnap: fire.DocumentSnapshot = await ctx.firestore.collection('users').doc(userId).get()

  if (!userSnap.exists) {
    throw new Error('User not found')
  }

  return mapToUserResponse(userSnap.ref.id, userSnap.data())
}