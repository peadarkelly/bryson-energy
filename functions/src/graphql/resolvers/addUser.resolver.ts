import { firestore as fire } from 'firebase-admin'
import { User } from '../models'
import { mapToNewUser } from '../mappers'

export default async function (parent: any, args: any, ctx: { firestore: fire.Firestore }): Promise<User> {
  if ((await ctx.firestore.collection('users').doc(args.userId).get()).exists) {
    throw new Error('userId already exists')
  }

  const user: User = mapToNewUser(args)
  await ctx.firestore.collection('users').doc(args.userId).set(user)

  return {
    ...user,
    userId: args.userId
  }
}
