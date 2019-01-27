import { firestore as fire } from 'firebase-admin'
import { UserModel, ClubModel, ClubUserModel, BaseModel } from '../models/firestore.models'
import { AddUserMutationArgs } from '../models/graphql.models'

export function mapToResult<T>(snap: fire.DocumentSnapshot): BaseModel<T> {
  return {
    id: snap.ref.id,
    data: <T>snap.data()
  }
}

export function mapToCollectionResult<T>(snap: fire.QuerySnapshot): BaseModel<T>[] {
  return snap.docs.map(doc => mapToResult(doc))
}

export function mapToUserModel(args: AddUserMutationArgs): UserModel {
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

export function mapToClubModel(admin: UserModel): ClubModel {
  return {
    admin: `${admin.firstName} ${admin.surname}`,
    createdDate: new Date(),
    numberOfMembers: 1
  }
}

export function mapToClubUserModel(admin: UserModel): ClubUserModel {
  return {
    name: `${admin.firstName} ${admin.surname}`
  }
}
