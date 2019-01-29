import { firestore as fire } from 'firebase-admin'

export interface BaseModel<T> {
  id: string,
  data: T,
}

export interface Context {
  firestore: fire.Firestore
}

export interface UserModel {
  userId?: string
  firstName: string
  surname: string
  email: string
  contact: string
  houseNumber: number
  addressLine1: string
  addressLine2?: string
  city: string
  postcode: string
  clubId?: string
}

export interface ClubModel {
  clubId?: string
  admin: string
  createdDate: Date
  numberOfMembers: number
}

export interface ClubUserModel {
  name: string
  isAdmin: boolean
}
