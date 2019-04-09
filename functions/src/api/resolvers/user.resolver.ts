import { injectable } from 'inversify'
import { UserQueryArgs, User } from '../models/graphql.models'
import { Context, BaseModel, UserModel } from '../../firestore/firestore.models'
import Resolver from './resolver'
import GraphqlMapper from '../mappers/graphql.mapper'
import UserDao from '../../firestore/daos/user.dao'

@injectable()
export default class UserResolver implements Resolver {

  public constructor(
    private graphqlMapper: GraphqlMapper,
    private userDao: UserDao
  ) {}

  public async resolve(parent: null, { userId }: UserQueryArgs, ctx: Context): Promise<User> {
    const user: BaseModel<UserModel> = await this.userDao.getUser(ctx, userId)

    if (!user) {
      throw new Error('User not found')
    }

    return this.graphqlMapper.mapToUser(user.id, user.data)
  }
}
