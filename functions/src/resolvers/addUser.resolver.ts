import { UserModel, Context } from '../models/firestore.models'
import { AddUserMutationArgs, User } from '../models/graphql.models'
import { mapToUserModel } from '../mappers/firestore.mapper'
import { mapToUser } from '../mappers/graphql.mapper'
import { getUser, createUser } from '../daos/user.dao'

export default async function (parent: null, args: AddUserMutationArgs, ctx: Context): Promise<User> {
  if ((await getUser(ctx, args.userId))) {
    throw new Error('userId already exists')
  }

  const user: UserModel = mapToUserModel(args)

  await createUser(ctx, args.userId, user)

  return mapToUser(args.userId, user)
}
