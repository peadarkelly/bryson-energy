import { injectable } from 'inversify'
import { Context, BaseModel, ClubModel, UserModel } from '../models/firestore.models'
import { JoinClubMutationArgs, User } from '../models/graphql.models'
import Resolver from './resolver'
import FirestoreMapper from '../mappers/firestore.mapper'
import GraphqlMapper from '../mappers/graphql.mapper'
import UserDao from '../daos/user.dao'
import ClubDao from '../daos/club.dao'
import ClubUserDao from '../daos/clubUser.dao'

@injectable()
export default class JoinClubResolver implements Resolver {

  public constructor(
    private firestoreMapper: FirestoreMapper,
    private graphqlMapper: GraphqlMapper,
    private userDao: UserDao,
    private clubDao: ClubDao,
    private clubUserDao: ClubUserDao
  ) {}

  public async resolve(parent: null, { userId, clubId }: JoinClubMutationArgs, ctx: Context): Promise<User> {
    const club: BaseModel<ClubModel> = await this.clubDao.getClub(ctx, clubId)
    if (!club) {
      throw new Error('clubId does not exist')
    }

    const user: BaseModel<UserModel> = await this.userDao.getUser(ctx, userId)
    if (!user) {
      throw new Error('userId does not exist')
    }

    if (user.data.clubId) {
      throw new Error('user has already joined a club')
    }

    await this.userDao.updateUserClubId(ctx, userId, clubId)
    await this.clubUserDao.createClubUser(ctx, clubId, user.id, this.firestoreMapper.mapToClubUserModel(user.data, false))
    await this.clubDao.incrementNumberOfMembers(ctx, clubId, club.data)

    return this.graphqlMapper.mapToUser(user.id, { ...user.data, clubId })
  }
}
