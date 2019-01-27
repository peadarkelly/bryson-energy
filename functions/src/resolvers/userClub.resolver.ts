import { injectable } from 'inversify'
import { Club, User } from '../models/graphql.models'
import { Context, BaseModel, ClubModel } from '../models/firestore.models'
import GraphqlMapper from '../mappers/graphql.mapper'
import ClubDao from '../daos/club.dao'

@injectable()
export default class UserClubResolver {

  public constructor(
    private graphqlMapper: GraphqlMapper,
    private clubDao: ClubDao
  ) {}

  public async resolve({ clubId }: User, args: null, ctx: Context): Promise<Club> {
    if (!clubId) {
      return null
    }

    const club: BaseModel<ClubModel> = await this.clubDao.getClub(ctx, clubId)

    return this.graphqlMapper.mapToClub(club.id, club.data)
  }
}
