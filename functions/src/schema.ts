import { gql, makeExecutableSchema, IResolvers, ITypeDefinitions } from 'apollo-server-express'
import resolvers from './resolvers/resolvers'

const typeDefs: ITypeDefinitions = gql`
  type User {
    userId: ID!
    firstName: String!
    surname: String!
    email: String!
    contact: String!
    houseNumber: Int!
    addressLine1: String!
    addressLine2: String
    city: String!
    postcode: String!
    clubId: ID
    club: Club
  }

  type Club {
    clubId: ID!
    admin: String!
    createdDate: String!
    numberOfMembers: Int!
    members: [ClubMember!]!
    orders: [Order!]!
  }

  type ClubMember {
    userId: ID!
    name: String!
    isAdmin: Boolean!
  }

  type Order {
    orderId: ID!
    deadlineDate: String!
    deliveryDate: String!
    totalVolume: Int!
    status: OrderStatus!
    numberOfParticipants: Int!
    participants: [OrderParticipant]!
  }

  type OrderParticipant {
    userId: ID!
    name: String!
    volume: Int!
    cost: Float!
    cashback: Float!
  }

  enum OrderStatus {
    OPEN
    DELIVERY_DUE
    COMPLETED
  }

  input UserInput {
    userId: ID!
    firstName: String!
    surname: String!
    email: String!
    contact: String!
    houseNumber: Int!
    addressLine1: String!
    addressLine2: String
    city: String!
    postcode: String!
  }

  input OrderInput {
    clubId: ID!
    deadlineDate: String!
    deliveryDate: String!
  }

  input JoinOrderInput {
    userId: ID!
    orderId: ID!
    volume: Int!
    cost: Float!
  }

  type Query {
    user(userId: ID!): User!

    clubs(clubId: ID): [Club!]!
  }

  type Mutation {
    addUser(input: UserInput!): User!

    addClub(adminId: ID!): Club!

    joinClub(userId: ID!, clubId: ID!): User!

    addOrder(input: OrderInput!): Order!

    joinOrder(input: JoinOrderInput!): Order!
  }

  schema {
    query: Query
    mutation: Mutation
  }
`

export default makeExecutableSchema({
  typeDefs,
  resolvers: <IResolvers>resolvers
})
