import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'
import { RegisterDetailsData } from './details/registerDetailsData'
import { RegisterAddressData } from './address/registerAddressData'

@Injectable()
export default class RegisterService {
  mutation = gql`
    mutation addUser(
      $userId: ID!,
      $firstName: String!,
      $surname: String!,
      $email: String!,
      $contact: String!,
      $houseNumber: Int!,
      $addressLine1: String!,
      $addressLine2: String,
      $city: String!,
      $postcode: String!
    ) {
      addUser(
        userId: ID!,
        firstName: $firstName,
        surname: $surname,
        email: $email,
        contact: $contact,
        houseNumber: $houseNumber,
        addressLine1: $addressLine1,
        addressLine2: $addressLine2,
        city: $city,
        postcode: $postcode
      ) {
        userId
        firstName
        surname
      }
    }`

  public constructor(private apollo: Apollo) {}

  public createUser(userId: string, details: RegisterDetailsData, address: RegisterAddressData) {
    return this.apollo.mutate({
      mutation: this.mutation,
      variables: {
        userId: userId,
        firstName: details.firstName,
        surname: details.surname,
        email: details.email,
        contact: details.contact,
        houseNumber: address.houseNumber,
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2,
        city: address.city,
        postcode: address.postcode
      }
    })
  }
}
