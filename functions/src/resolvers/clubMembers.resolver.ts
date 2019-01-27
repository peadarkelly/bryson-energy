import { Context, BaseModel, ClubUserModel } from '../models/firestore.models'
import { ClubMember, Club } from '../models/graphql.models'
import { mapToClubMember } from '../mappers/graphql.mapper'
import { getClubUsers } from '../daos/clubUsers.dao'

export default async function ({ clubId }: Club, args: any, ctx: Context): Promise<ClubMember[]> {
  if (!clubId) {
    return []
  }

  const clubUsers: BaseModel<ClubUserModel>[] = await getClubUsers(ctx, clubId)

  return clubUsers.map(clubUser => mapToClubMember(clubUser.id, clubUser.data))
}
