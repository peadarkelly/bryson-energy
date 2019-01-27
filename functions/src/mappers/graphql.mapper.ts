import { User, Club, ClubMember } from '../models/graphql.models'
import { UserModel, ClubModel, ClubUserModel } from '../models/firestore.models'

export function mapToUser(dockRef: string, doc: UserModel): User {
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

export function mapToClub(docRef: string, doc: ClubModel): Club {
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

export function mapToClubMember(docRef: string, doc: ClubUserModel): ClubMember {
  return {
    userId: docRef,
    name: doc.name
  }
}