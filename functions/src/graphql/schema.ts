import { gql, makeExecutableSchema } from 'apollo-server-express'
import resolvers from './resolvers/resolvers'

const typeDefs = gql`
  type User {
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
  }

  type Club {
    clubId: ID!
    admin: String!
    createdDate: String!
    lastOrderDate: String
    numberOfMembers: Int!
  }

  type Query {
    getUser(userId: ID!): User

    getClubs(clubId: ID): [Club!]
  }

  type Mutation {
    addUser(
      userId: ID!,
      firstName: String!,
      surname: String!,
      email: String!,
      contact: String!,
      houseNumber: Int!,
      addressLine1: String!,
      addressLine2: String,
      city: String!,
      postcode: String!
    ): User

    joinClub(userId: ID!, clubId: ID!): User
  }
`

export default makeExecutableSchema({
  typeDefs,
  resolvers
})