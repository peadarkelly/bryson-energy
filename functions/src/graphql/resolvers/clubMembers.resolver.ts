import { firestore as fire } from 'firebase-admin'
import { mapToClubMember } from '../mappers'

export default async ({ clubId }: any, args: any, ctx: { firestore: fire.Firestore }) => {
  const clubUsers = await ctx.firestore.collection('clubUsers').doc(clubId).collection('users').get()

  return clubUsers.docs.map(clubUser => mapToClubMember(clubUser.data()))
}
