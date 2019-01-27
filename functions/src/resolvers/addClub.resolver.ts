import { Context, BaseModel, UserModel, ClubModel } from '../models/firestore.models'
import { AddClubMutationArgs, Club } from '../models/graphql.models'
import { mapToClubModel } from '../mappers/firestore.mapper'
import { mapToClub } from '../mappers/graphql.mapper'
import { getUser, updateUserClubId } from '../daos/user.dao'
import { createClubUser } from '../daos/clubUsers.dao'
import { createClub } from '../daos/club.dao'

export default async function (parent: null, { adminId }: AddClubMutationArgs, ctx: Context): Promise<Club> {
  const admin: BaseModel<UserModel> = await getUser(ctx, adminId)
  if (!admin) {
    throw new Error('user does not exist')
  }

  if (admin.data.clubId) {
    throw new Error('user is already a member of another club')
  }

  const club: BaseModel<ClubModel> = await createClub(ctx, mapToClubModel(admin.data))

  await updateUserClubId(ctx, adminId, club.id)
  await createClubUser(ctx, club.id, admin.id, admin.data)

  return mapToClub(club.id, club.data)
}
