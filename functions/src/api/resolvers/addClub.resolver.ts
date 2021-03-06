import { injectable } from 'inversify'
import { Context, BaseModel, UserModel, ClubModel } from '../../firestore/firestore.models'
import { AddClubMutationArgs, Club } from '../models/graphql.models'
import Resolver from './resolver'
import FirestoreMapper from '../mappers/firestore.mapper'
import GraphqlMapper from '../mappers/graphql.mapper'
import UserDao from '../../firestore/daos/user.dao'
import ClubDao from '../../firestore/daos/club.dao'
import ClubUserDao from '../../firestore/daos/clubUser.dao'

@injectable()
export default class AddClubResolver implements Resolver {

  public constructor(
    private firestoreMapper: FirestoreMapper,
    private graphqlMapper: GraphqlMapper,
    private userDao: UserDao,
    private clubDao: ClubDao,
    private clubUserDao: ClubUserDao
  ) {}

  public async resolve(parent: null, { adminId }: AddClubMutationArgs, ctx: Context): Promise<Club> {
    const admin: BaseModel<UserModel> = await this.userDao.getUser(ctx, adminId)
    if (!admin) {
      throw new Error('user does not exist')
    }

    if (admin.data.clubId) {
      throw new Error('user is already a member of another club')
    }

    const club: BaseModel<ClubModel> = await this.clubDao.createClub(ctx, this.firestoreMapper.mapToClubModel(admin.data))

    await this.userDao.updateUserClubId(ctx, adminId, club.id)
    await this.clubUserDao.createClubUser(ctx, club.id, admin.id, this.firestoreMapper.mapToClubUserModel(admin.data, true))

    return this.graphqlMapper.mapToClub(club.id, club.data)
  }
}
