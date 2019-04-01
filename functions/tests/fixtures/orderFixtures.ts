import { Order, OrderStatus, OrderParticipant, OrderInput, JoinOrderInput } from '../../src/api/models/graphql.models'
import { ClubOrderModel, OrderUserModel } from '../../src/api/models/firestore.models'

export function generateGraphQLOrder(): Order {
  return {
    orderId: 'someOrderId',
    deadlineDate: new Date().toISOString(),
    deliveryDate: new Date().toISOString(),
    totalVolume: 100,
    status: OrderStatus.Open,
    numberOfParticipants: 10,
    participants: []
  }
}

export function generateFirestoreClubOrder(): ClubOrderModel {
  return {
    deadlineDate: new Date(),
    deliveryDate: new Date(),
    totalVolume: 100,
    numberOfParticipants: 10
  }
}

export function generateGraphQLOrderParticipant(): OrderParticipant {
  return {
    userId: 'someUserId',
    name: 'some user',
    cost: 300,
    volume: 500,
    cashback: 10
  }
}

export function generateFirestoreOrderUser(): OrderUserModel {
  return {
    name: 'some user',
    cost: 300,
    volume: 500,
    cashback: 10
  }
}

export function generateGraphQLOrderInput(): OrderInput {
  return {
    clubId: 'someClubId',
    deadlineDate: new Date().toISOString(),
    deliveryDate: new Date().toISOString()
  }
}

export function generateGraphQLJoinOrderInput(): JoinOrderInput {
  return {
    userId: 'someUserId',
    orderId: 'someOrderId',
    volume: 500,
    cost: 300
  }
}