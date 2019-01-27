import { injectable } from 'inversify'
import { Context, BaseModel, ClubUserModel } from '../models/firestore.models'
import { ClubMember, Club } from '../models/graphql.models'
import GraphqlMapper from '../mappers/graphql.mapper'
import ClubUserDao from '../daos/clubUser.dao'

@injectable()
export default class ClubMembersResolver {

  public constructor(
    private graphqlMapper: GraphqlMapper,
    private clubUserDao: ClubUserDao
  ) {}

  public async resolve({ clubId }: Club, args: any, ctx: Context): Promise<ClubMember[]> {
    if (!clubId) {
      return []
    }

    const clubUsers: BaseModel<ClubUserModel>[] = await this.clubUserDao.getClubUsers(ctx, clubId)

    return clubUsers.map(clubUser => this.graphqlMapper.mapToClubMember(clubUser.id, clubUser.data))
  }
}
