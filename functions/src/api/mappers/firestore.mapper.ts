import { injectable } from 'inversify'
import { UserModel, ClubModel, ClubUserModel, ClubOrderModel, OrderUserModel } from '../models/firestore.models'
import { UserInput, OrderInput, JoinOrderInput } from '../models/graphql.models'

@injectable()
export default class FirestoreMapper {

  public mapToUserModel(input: UserInput): UserModel {
    return {
      firstName: input.firstName,
      surname: input.surname,
      email: input.email,
      contact: input.contact,
      placeId: input.placeId
    }
  }

  public mapToClubModel(admin: UserModel): ClubModel {
    return {
      admin: `${admin.firstName} ${admin.surname}`,
      placeId: admin.placeId,
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

  public mapToClubOrderModel(input: OrderInput): ClubOrderModel {
    return {
      deliveryDate: new Date(input.deliveryDate),
      deadlineDate: new Date(input.deadlineDate),
      totalVolume: 0,
      numberOfParticipants: 0
    }
  }

  public mapToOrderUserModel(user: UserModel, input: JoinOrderInput): OrderUserModel {
    return {
      name: `${user.firstName} ${user.surname}`,
      volume: input.volume,
      cost: input.cost
    }
  }
}
