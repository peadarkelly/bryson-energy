import { firestore as fire } from 'firebase-admin'
import { mapToClub } from '../mappers'

export default async ({ clubId }: any, args: any, ctx: { firestore: fire.Firestore }) => {
  const clubSnap: fire.DocumentSnapshot = await ctx.firestore.collection('clubs').doc(clubId).get()

  if (!clubSnap.exists) {
    return null
  }

  return mapToClub(clubSnap.ref.id, clubSnap.data())
}
