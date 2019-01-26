import { firestore as fire } from 'firebase-admin'
import { mapToClub } from '../mappers'

export default async (parent: any, { clubId }: any, ctx: { firestore: fire.Firestore }) => {
  const clubsReference = ctx.firestore.collection('clubs')

  if (clubId) {
    clubsReference.doc(clubId)
  }

  const clubsSnap: fire.QuerySnapshot = await clubsReference.get()

  // TODO filter clubs in range

  return clubsSnap.docs.map(doc => mapToClub(doc.ref.id, doc.data()))
}