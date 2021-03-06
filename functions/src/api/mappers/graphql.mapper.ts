import { injectable } from 'inversify'
import { User, Club, ClubMember, Order, OrderParticipant } from '../models/graphql.models'
import { UserModel, ClubModel, ClubUserModel, ClubOrderModel, OrderUserModel } from '../../firestore/firestore.models'

@injectable()
export default class GraphqlMapper {

  public mapToUser(dockRef: string, doc: UserModel): User {
    return {
      userId: dockRef,
      firstName: doc.firstName,
      surname: doc.surname,
      email: doc.email,
      contact: doc.contact,
      clubId: doc.clubId,
      placeId: doc.placeId
    }
  }

  public mapToClub(docRef: string, doc: ClubModel): Club {
    return {
      clubId: docRef,
      admin: doc.admin,
      createdDate: doc.createdDate.toISOString(),
      numberOfMembers: doc.numberOfMembers,
      members: [],
      orders: []
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
      deliveryDate: doc.deliveryDate.toISOString(),
      totalVolume: doc.totalVolume,
      status: null,
      numberOfParticipants: doc.numberOfParticipants,
      participants: []
    }
  }

  public mapToOrderParticipant(docRef: string, doc: OrderUserModel): OrderParticipant {
    return {
      userId: docRef,
      name: doc.name,
      volume: doc.volume,
      cost: doc.cost,
      cashback: doc.cashback || 0
    }
  }
}
