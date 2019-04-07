import express from 'express'
import * as functions from 'firebase-functions'
import { ApolloServer } from 'apollo-server-express'
import { firestore as fire } from 'firebase-admin'
import schema from './schema'

export default function setupGraphqlServer(firestore: fire.Firestore): express.Application {
  const server: ApolloServer = new ApolloServer({
    schema: schema,
    introspection: true,
    playground: {
      endpoint: functions.config().api.url
    },
    context: () => ({
      firestore: firestore
    })
  })

  const app: express.Application = express()
  server.applyMiddleware({ app })

  return app
}
