import { firestore as fire } from 'firebase-admin'
import { User } from '../models'

export default async (parent: any, { userId, clubId }: any, ctx: { firestore: fire.Firestore }) => {
  const clubSnap: fire.DocumentSnapshot = await ctx.firestore.collection('clubs').doc(clubId).get()
  if (!clubSnap.exists) {
    throw new Error('clubId does not exist')
  }

  const userSnap: fire.DocumentSnapshot = await ctx.firestore.collection('users').doc(userId).get()
  if (!userSnap.exists) {
    throw new Error('userId does not exist')
  }

  let userData: User = <User>userSnap.data()
  if (userData.clubId) {
    throw new Error('user has already joined a club')
  }

  userData.clubId = clubId

  await ctx.firestore.collection('users').doc(userId).set(userData)
  await ctx.firestore.collection('clubUsers').doc(clubId).collection('users').doc(userId).set({ name: `${userData.firstName} ${userData.surname}` })
  await ctx.firestore.collection('clubs').doc(clubId).update({ numberOfMembers: clubSnap.data().numberOfMembers + 1 })

  return userData
}