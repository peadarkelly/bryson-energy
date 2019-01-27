import { injectable } from 'inversify'
import { GetClubsQueryArgs, Club } from '../models/graphql.models'
import { Context, BaseModel, ClubModel } from '../models/firestore.models'
import GraphqlMapper from '../mappers/graphql.mapper'
import ClubDao from '../daos/club.dao'

@injectable()
export default class GetClubsResolver {

  public constructor(
    private graphqlMapper: GraphqlMapper,
    private clubDao: ClubDao
  ) {
  }

  public async resolve(parent: null, { clubId }: GetClubsQueryArgs, ctx: Context): Promise<Club[]> {
    const clubs: BaseModel<ClubModel>[] = await this.clubDao.getClubs(ctx, clubId)

    // TODO filter clubs in range

    return clubs.map(club => this.graphqlMapper.mapToClub(club.id, club.data))
  }
}
