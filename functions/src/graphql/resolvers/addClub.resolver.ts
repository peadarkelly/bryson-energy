import { firestore as fire } from 'firebase-admin'
import { User, Club } from '../models'
import { mapToNewClub, mapToClubResponse } from '../mappers'

export default async function (parent: any, { adminId }: any, ctx: { firestore: fire.Firestore }): Promise<Club> {
  const adminSnap: fire.DocumentSnapshot = await ctx.firestore.collection('users').doc(adminId).get()
  if (!adminSnap.exists) {
    throw new Error('user does not exist')
  }

  const admin: User = <User>adminSnap.data()
  if (admin.clubId) {
    throw new Error('user is already a member of another club')
  }

  const club: Club = mapToNewClub(admin)
  const clubRef: fire.DocumentReference = await ctx.firestore.collection('clubs').add(club)
  const clubSnap: fire.DocumentSnapshot = await clubRef.get()

  const clubId: string = clubSnap.ref.id

  await ctx.firestore.collection('users').doc(adminId).update({ clubId: clubId })
  await ctx.firestore.collection('clubUsers').doc(clubId).collection('users').doc(adminSnap.ref.id).set({ name: `${admin.firstName} ${admin.surname}` })

  return mapToClubResponse(clubId, clubSnap.data())
}
