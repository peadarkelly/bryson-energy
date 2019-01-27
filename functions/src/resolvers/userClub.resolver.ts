import { Club, User } from '../models/graphql.models'
import { Context, BaseModel, ClubModel } from '../models/firestore.models'
import { mapToClub } from '../mappers/graphql.mapper'
import { getClub } from '../daos/club.dao'

export default async function ({ clubId }: User, args: null, ctx: Context): Promise<Club> {
  if (!clubId) {
    return null
  }

  const club: BaseModel<ClubModel> = await getClub(ctx, clubId)

  return mapToClub(club.id, club.data)
}
