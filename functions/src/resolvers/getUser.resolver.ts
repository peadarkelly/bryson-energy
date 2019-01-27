import { GetUserQueryArgs, User } from '../models/graphql.models'
import { Context, BaseModel, UserModel } from '../models/firestore.models'
import { mapToUser } from '../mappers/graphql.mapper'
import { getUser } from '../daos/user.dao'

export default async function (parent: null, { userId }: GetUserQueryArgs, ctx: Context): Promise<User> {
  const user: BaseModel<UserModel> = await getUser(ctx, userId)

  if (!user) {
    throw new Error('User not found')
  }

  return mapToUser(user.id, user.data)
}