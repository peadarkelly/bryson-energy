import { gql, makeExecutableSchema } from 'apollo-server-express'
import resolvers from './resolvers/resolvers'

const typeDefs = gql`
  type Query {
    hello: String
  }
`

export default makeExecutableSchema({
  typeDefs,
  resolvers,
})