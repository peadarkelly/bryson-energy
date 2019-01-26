import { firestore as fire } from 'firebase-admin'
import { User } from '../models'
import { mapToUserResponse } from '../mappers';

export default async function (parent: any, { userId, clubId }: any, ctx: { firestore: fire.Firestore }): Promise<User> {
  const clubSnap: fire.DocumentSnapshot = await ctx.firestore.collection('clubs').doc(clubId).get()
  if (!clubSnap.exists) {
    throw new Error('clubId does not exist')
  }

  const userSnap: fire.DocumentSnapshot = await ctx.firestore.collection('users').doc(userId).get()
  if (!userSnap.exists) {
    throw new Error('userId does not exist')
  }

  const userData: User = mapToUserResponse(userSnap.ref.id, userSnap.data())
  if (userData.clubId) {
    throw new Error('user has already joined a club')
  }

  await ctx.firestore.collection('users').doc(userId).update({ clubId: clubId })
  await ctx.firestore.collection('clubUsers').doc(clubId).collection('users').doc(userId).set({ name: `${userData.firstName} ${userData.surname}` })
  await ctx.firestore.collection('clubs').doc(clubId).update({ numberOfMembers: clubSnap.data().numberOfMembers + 1 })

  return {
    ...userData,
    clubId: clubId
  }
}