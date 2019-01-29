import { injectable } from 'inversify'
import { UserModel, ClubModel, ClubUserModel } from '../models/firestore.models'
import { AddUserMutationArgs } from '../models/graphql.models'

@injectable()
export default class FirestoreMapper {

  public mapToUserModel(args: AddUserMutationArgs): UserModel {
    return {
      firstName: args.firstName,
      surname: args.surname,
      email: args.email,
      contact: args.contact,
      houseNumber: args.houseNumber,
      addressLine1: args.addressLine1,
      addressLine2: args.addressLine2,
      city: args.city,
      postcode: args.postcode
    }
  }

  public mapToClubModel(admin: UserModel): ClubModel {
    return {
      admin: `${admin.firstName} ${admin.surname}`,
      createdDate: new Date(),
      numberOfMembers: 1
    }
  }

  public mapToClubUserModel(user: UserModel, isAdmin: boolean): ClubUserModel {
    return {
      name: `${user.firstName} ${user.surname}`,
      isAdmin: isAdmin
    }
  }
}
