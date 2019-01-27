import { Context, BaseModel, ClubModel, UserModel } from '../models/firestore.models'
import { JoinClubMutationArgs, User } from '../models/graphql.models'
import { mapToUser } from '../mappers/graphql.mapper'
import { getUser, updateUserClubId } from '../daos/user.dao'
import { createClubUser } from '../daos/clubUsers.dao'
import { incrementNumberOfMembers, getClub } from '../daos/club.dao'

export default async function (parent: null, { userId, clubId }: JoinClubMutationArgs, ctx: Context): Promise<User> {
  const club: BaseModel<ClubModel> = await getClub(ctx, clubId)
  if (!club) {
    throw new Error('clubId does not exist')
  }

  const user: BaseModel<UserModel> = await getUser(ctx, userId)
  if (!user) {
    throw new Error('userId does not exist')
  }

  if (user.data.clubId) {
    throw new Error('user has already joined a club')
  }

  await updateUserClubId(ctx, userId, clubId)
  await createClubUser(ctx, clubId, user.id, user.data)
  await incrementNumberOfMembers(ctx, clubId, club.data)

  return mapToUser(user.id, { ...user.data, clubId })
}