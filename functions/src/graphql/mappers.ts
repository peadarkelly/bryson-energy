import { User, Club, ClubMember } from './models'

export function mapToUser(args: any): User {
  return {
    userId: args.userId,
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

export function mapToClub(docRef: string, doc: any): Club {
  return {
    clubId: docRef,
    admin: doc.admin,
    createdDate: doc.createdDate,
    lastOrderDate: doc.lastOrderDate,
    numberOfMembers: doc.numberOfMembers
  }
}

export function mapToClubMember(doc: any): ClubMember {
  return {
    name: doc.name
  }
}
