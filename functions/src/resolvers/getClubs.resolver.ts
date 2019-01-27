import { GetClubsQueryArgs, Club } from '../models/graphql.models'
import { Context, BaseModel, ClubModel } from '../models/firestore.models'
import { mapToClub } from '../mappers/graphql.mapper'
import { getClubs } from '../daos/club.dao'

export default async function (parent: null, { clubId }: GetClubsQueryArgs, ctx: Context): Promise<Club[]> {
  const clubs: BaseModel<ClubModel>[] = await getClubs(ctx, clubId)

  // TODO filter clubs in range

  return clubs.map(club => mapToClub(club.id, club.data))
}