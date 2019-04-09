import { Club, ClubMember } from '../../src/api/models/graphql.models'
import { ClubModel, ClubUserModel } from '../../src/firestore/firestore.models'

export function generateGraphQLClub(): Club {
  return {
    clubId: 'someClubId',
    admin: 'some admin',
    createdDate: new Date().toISOString(),
    numberOfMembers: 10,
    members: [],
    orders: []
  }
}

export function generateFirestoreClub(): ClubModel {
  return {
    clubId: 'someClubId',
    admin: 'some admin',
    createdDate: new Date(),
    numberOfMembers: 10,
    placeId: 'somePlaceId'
  }
}

export function generateGraphQLClubMember(): ClubMember {
  return {
    userId: 'someUserId',
    name: 'some user',
    isAdmin: true
  }
}

export function generateFirestoreClubUser(): ClubUserModel {
  return {
    name: 'some user',
    isAdmin: true
  }
}