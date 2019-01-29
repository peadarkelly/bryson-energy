import { injectable } from 'inversify'
import { UserModel, Context } from '../models/firestore.models'
import { AddUserMutationArgs, User } from '../models/graphql.models'
import Resolver from './resolver'
import FirestoreMapper from '../mappers/firestore.mapper'
import GraphqlMapper from '../mappers/graphql.mapper'
import UserDao from '../daos/user.dao'

@injectable()
export default class AddUserResolver implements Resolver {

  public constructor(
    private firestoreMapper: FirestoreMapper,
    private graphqlMapper: GraphqlMapper,
    private userDao: UserDao
  ) {}

  public async resolve(parent: null, args: AddUserMutationArgs, ctx: Context): Promise<User> {
    if ((await this.userDao.getUser(ctx, args.userId))) {
      throw new Error('userId already exists')
    }

    const user: UserModel = this.firestoreMapper.mapToUserModel(args)

    await this.userDao.createUser(ctx, args.userId, user)

    return this.graphqlMapper.mapToUser(args.userId, user)
  }
}
