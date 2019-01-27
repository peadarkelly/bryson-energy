import { firestore as fire } from 'firebase-admin'
import { Context, BaseModel, ClubModel } from '../models/firestore.models'
import { mapToResult, mapToCollectionResult } from '../mappers/firestore.mapper'

export async function createClub(ctx: Context, club: ClubModel): Promise<BaseModel<ClubModel>> {
  const clubRef: fire.DocumentReference = await ctx.firestore.collection('clubs').add(club)
  const clubSnap: fire.DocumentSnapshot = await clubRef.get()

  return mapToResult<ClubModel>(clubSnap)
}

export async function getClubs(ctx: Context, clubId?: string): Promise<BaseModel<ClubModel>[]> {
  const clubsReference = ctx.firestore.collection('clubs')

  if (clubId) {
    clubsReference.doc(clubId)
  }

  const clubsSnap: fire.QuerySnapshot = await clubsReference.get()

  return mapToCollectionResult<ClubModel>(clubsSnap)
}

export async function getClub(ctx: Context, clubId: string): Promise<BaseModel<ClubModel>> {
  const clubSnap: fire.DocumentSnapshot = await ctx.firestore.collection('clubs').doc(clubId).get()

  if (!clubSnap.exists) {
    return null
  }

  return mapToResult(clubSnap)
}

export async function updateUserClubId(ctx: Context, userId: string, clubId: string): Promise<void> {
  await ctx.firestore.collection('users').doc(userId).update({ clubId: clubId })
}

export async function incrementNumberOfMembers(ctx: Context, clubId: string, club: ClubModel): Promise<void> {
  await ctx.firestore.collection('clubs').doc(clubId).update({ numberOfMembers: club.numberOfMembers + 1 })
}