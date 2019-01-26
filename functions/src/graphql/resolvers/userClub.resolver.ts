import { firestore as fire } from 'firebase-admin'
import { mapToClubResponse } from '../mappers'
import { Club } from '../models'

export default async function ({ clubId }: any, args: any, ctx: { firestore: fire.Firestore }): Promise<Club> {
  const clubSnap: fire.DocumentSnapshot = await ctx.firestore.collection('clubs').doc(clubId).get()

  if (!clubSnap.exists) {
    return null
  }

  return mapToClubResponse(clubSnap.ref.id, clubSnap.data())
}
