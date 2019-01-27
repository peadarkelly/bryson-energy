import { injectable } from 'inversify'
import { User, Club, ClubMember } from '../models/graphql.models'
import { UserModel, ClubModel, ClubUserModel } from '../models/firestore.models'

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
    const club: Club =  {
      clubId: docRef,
      admin: doc.admin,
      createdDate: doc.createdDate.toISOString(),
      numberOfMembers: doc.numberOfMembers,
      members: []
    }

    if (doc.lastOrderDate) {
      club.lastOrderDate = doc.lastOrderDate.toISOString()
    }

    return club
  }

  public mapToClubMember(docRef: string, doc: ClubUserModel): ClubMember {
    return {
      userId: docRef,
      name: doc.name
    }
  }
}
