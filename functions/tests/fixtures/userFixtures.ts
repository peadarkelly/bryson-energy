import { User, UserInput } from '../../src/api/models/graphql.models'
import { UserModel } from '../../src/firestore/firestore.models'

export function generateGraphQLUser(): User {
  return {
    userId: 'someUserId',
    firstName: 'someFirstname',
    surname: 'someSurname',
    email: 'some@mail.com',
    contact: 'some contact',
    placeId: 'somePlaceId',
    clubId: 'someClubId'
  }
}

export function generateFirestoreUser(): UserModel {
  return {
    userId: 'someUserId',
    firstName: 'someFirstname',
    surname: 'someSurname',
    email: 'some@mail.com',
    contact: 'some contact',
    placeId: 'somePlaceId',
    clubId: 'someClubId'
  }
}

export function generateGraphQLUserInput(): UserInput {
  return {
    userId: 'someUserId',
    firstName: 'someFirstname',
    surname: 'someSurname',
    email: 'some@mail.com',
    contact: 'some contact',
    placeId: 'somePlaceId'
  }
}