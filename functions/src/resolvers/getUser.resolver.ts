import { injectable } from 'inversify'
import { GetUserQueryArgs, User } from '../models/graphql.models'
import { Context, BaseModel, UserModel } from '../models/firestore.models'
import GraphqlMapper from '../mappers/graphql.mapper'
import UserDao from '../daos/user.dao'

@injectable()
export default class GetUserResolver {

  public constructor(
    private graphqlMapper: GraphqlMapper,
    private userDao: UserDao
  ) {}

  public async resolve(parent: null, { userId }: GetUserQueryArgs, ctx: Context): Promise<User> {
    const user: BaseModel<UserModel> = await this.userDao.getUser(ctx, userId)

    if (!user) {
      throw new Error('User not found')
    }

    return this.graphqlMapper.mapToUser(user.id, user.data)
  }
}
