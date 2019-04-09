import { injectable } from 'inversify'
import { ClubQueryArgs, Club } from '../models/graphql.models'
import { Context, BaseModel, ClubModel } from '../../firestore/firestore.models'
import Resolver from './resolver'
import GraphqlMapper from '../mappers/graphql.mapper'
import ClubDao from '../../firestore/daos/club.dao'

@injectable()
export default class ClubResolver implements Resolver {

  public constructor(
    private graphqlMapper: GraphqlMapper,
    private clubDao: ClubDao,
  ) {}

  public async resolve(parent: null, { clubId }: ClubQueryArgs, ctx: Context): Promise<Club> {
    const club: BaseModel<ClubModel> = await this.clubDao.getClub(ctx, clubId)
    if (!club) {
      throw new Error('clubId does not exist')
    }

    return this.graphqlMapper.mapToClub(club.id, club.data)
  }
}
