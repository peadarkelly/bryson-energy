import { firestore as fire } from 'firebase-admin'
import { mapToClubResponse } from '../mappers'
import { Club } from '../models'

export default async function (parent: any, { clubId }: any, ctx: { firestore: fire.Firestore }): Promise<Club[]> {
  const clubsReference = ctx.firestore.collection('clubs')

  if (clubId) {
    clubsReference.doc(clubId)
  }

  const clubsSnap: fire.QuerySnapshot = await clubsReference.get()

  // TODO filter clubs in range

  return clubsSnap.docs.map(doc => mapToClubResponse(doc.ref.id, doc.data()))
}