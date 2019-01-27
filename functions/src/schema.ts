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
    lastOrderDate: String
    numberOfMembers: Int!
    members: [ClubMember!]!
  }

  type ClubMember {
    userId: ID!
    name: String!
  }

  type Query {
    getUser(userId: ID!): User!

    getClubs(clubId: ID): [Club!]!
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
    ): User!

    addClub(adminId: ID!): Club!

    joinClub(userId: ID!, clubId: ID!): User!
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
