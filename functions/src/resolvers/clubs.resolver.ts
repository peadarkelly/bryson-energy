import { injectable } from 'inversify'
import { ClubsQueryArgs, Club } from '../models/graphql.models'
import { Context, BaseModel, ClubModel } from '../models/firestore.models'
import Resolver from './resolver'
import GraphqlMapper from '../mappers/graphql.mapper'
import ClubDao from '../daos/club.dao'

@injectable()
export default class ClubsResolver implements Resolver {

  public constructor(
    private graphqlMapper: GraphqlMapper,
    private clubDao: ClubDao
  ) {
  }

  public async resolve(parent: null, { clubId }: ClubsQueryArgs, ctx: Context): Promise<Club[]> {
    const clubs: BaseModel<ClubModel>[] = await this.clubDao.getClubs(ctx, clubId)

    // TODO filter clubs in range

    return clubs.map(club => this.graphqlMapper.mapToClub(club.id, club.data))
  }
}
