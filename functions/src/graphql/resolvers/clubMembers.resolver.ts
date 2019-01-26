import { firestore as fire } from 'firebase-admin'
import { mapToClubMember } from '../mappers'
import { ClubMember } from '../models'

export default async function ({ clubId }: any, args: any, ctx: { firestore: fire.Firestore }): Promise<ClubMember[]> {
  const clubUsers = await ctx.firestore.collection('clubUsers').doc(clubId).collection('users').get()

  return clubUsers.docs.map(clubUser => mapToClubMember(clubUser.data()))
}
