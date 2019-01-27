import { injectable } from 'inversify'
import { firestore as fire } from 'firebase-admin'
import { Context, BaseModel, ClubModel } from '../models/firestore.models'
import BaseDao from './base.dao'

@injectable()
export default class ClubDao extends BaseDao<ClubModel> {

  public async createClub(ctx: Context, club: ClubModel): Promise<BaseModel<ClubModel>> {
    const clubRef: fire.DocumentReference = await ctx.firestore.collection('clubs').add(club)
    const clubSnap: fire.DocumentSnapshot = await clubRef.get()

    return super.mapToResult(clubSnap)
  }

  public async getClubs(ctx: Context, clubId?: string): Promise<BaseModel<ClubModel>[]> {
    const clubsReference = ctx.firestore.collection('clubs')

    if (clubId) {
      clubsReference.doc(clubId)
    }

    const clubsSnap: fire.QuerySnapshot = await clubsReference.get()

    return super.mapToCollectionResult(clubsSnap)
  }

  public async getClub(ctx: Context, clubId: string): Promise<BaseModel<ClubModel>> {
    const clubSnap: fire.DocumentSnapshot = await ctx.firestore.collection('clubs').doc(clubId).get()

    if (!clubSnap.exists) {
      return null
    }

    return super.mapToResult(clubSnap)
  }

  public async updateUserClubId(ctx: Context, userId: string, clubId: string): Promise<void> {
    await ctx.firestore.collection('users').doc(userId).update({ clubId: clubId })
  }

  public async incrementNumberOfMembers(ctx: Context, clubId: string, club: ClubModel): Promise<void> {
    await ctx.firestore.collection('clubs').doc(clubId).update({ numberOfMembers: club.numberOfMembers + 1 })
  }
}
