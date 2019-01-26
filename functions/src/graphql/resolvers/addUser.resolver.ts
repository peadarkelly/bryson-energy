import { firestore as fire } from 'firebase-admin'
import { User } from '../models'
import { mapToUser } from '../mappers'

export default async (parent: any, args: any, ctx: { firestore: fire.Firestore }) => {
  if ((await ctx.firestore.collection('users').doc(args.userId).get()).exists) {
    throw new Error('userId already exists')
  }

  const user: User = mapToUser(args)
  await ctx.firestore.collection('users').doc(args.userId).set(user)
  return user
}
