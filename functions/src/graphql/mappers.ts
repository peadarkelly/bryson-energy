import { firestore as fire } from 'firebase-admin'
import { User, Club, ClubMember } from './models'

export function mapToNewUser(args: any): User {
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

export function mapToUserResponse(dockRef: string, doc: any): User {
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
    postcode: doc.postcode
  }
}

export function mapToNewClub(admin: User): Club {
  return {
    admin: `${admin.firstName} ${admin.surname}`,
    createdDate: fire.Timestamp.fromDate(new Date()),
    numberOfMembers: 1
  }
}

export function mapToClubResponse(docRef: string, doc: any): Club {
  let club: Club =  {
    clubId: docRef,
    admin: doc.admin,
    createdDate: doc.createdDate.toISOString(),
    numberOfMembers: doc.numberOfMembers
  }

  if (doc.lastOrderDate) {
    club.lastOrderDate = doc.lastOrderDate.toISOString()
  }

  return club
}

export function mapToClubMember(doc: any): ClubMember {
  return {
    name: doc.name
  }
}
