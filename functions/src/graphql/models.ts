import { firestore as fire } from 'firebase-admin'

export interface User {
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

export interface Club {
  clubId?: string
  admin: string
  createdDate: fire.Timestamp
  lastOrderDate?: fire.Timestamp
  numberOfMembers: number
}

export interface ClubMember {
  name: string
}
