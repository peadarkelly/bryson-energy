import { injectable } from 'inversify'
import { User, Club, ClubMember, Order } from '../models/graphql.models'
import { UserModel, ClubModel, ClubUserModel, ClubOrderModel } from '../models/firestore.models'

@injectable()
export default class GraphqlMapper {

  public mapToUser(dockRef: string, doc: UserModel): User {
    return {
      userId: dockRef,
      firstName: doc.firstName,
      surname: doc.surname,
      email: doc.email,
      contact: doc.contact,
      houseNumber: doc.houseNumber,
      addressLine1: doc.addressLine1,
      addressLine2: doc.addressLine2,
      city: doc.city,
      postcode: doc.postcode,
      clubId: doc.clubId
    }
  }

  public mapToClub(docRef: string, doc: ClubModel): Club {
    return {
      clubId: docRef,
      admin: doc.admin,
      createdDate: doc.createdDate.toISOString(),
      numberOfMembers: doc.numberOfMembers,
      members: []
    }
  }

  public mapToClubMember(docRef: string, doc: ClubUserModel): ClubMember {
    return {
      userId: docRef,
      name: doc.name,
      isAdmin: doc.isAdmin
    }
  }

  public mapToOrder(docRef: string, doc: ClubOrderModel): Order {
    return {
      orderId: docRef,
      deadlineDate: doc.deadlineDate.toISOString(),
      totalVolume: doc.totalVolume,
      numberOfParticipants: doc.numberOfParticipants
    }
  }
}
