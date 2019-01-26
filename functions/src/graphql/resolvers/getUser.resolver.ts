import { firestore as fire } from 'firebase-admin'

export default async (parent: any, { userId }: any, ctx: { firestore: fire.Firestore }) => {
  const user = await ctx.firestore.collection('users').doc(userId).get()

  if (!user.exists) {
    throw new Error('User not found')
  }

  return user.data()
}