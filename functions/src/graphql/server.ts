import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { printSchema } from 'graphql'
import { firestore as fire } from 'firebase-admin'
import schema from './schema'

export default function setupGraphqlServer(firestore: fire.Firestore): express.Application {
  const server: ApolloServer = new ApolloServer({
    schema: schema,
    introspection: true,
    playground: {
      endpoint: 'api/graphql'
    },
    context: () => ({
      firestore: firestore
    })
  })

  const app: express.Application = express()
  server.applyMiddleware({ app })

  app.use("/schema", (req, res) => {
    res.set("Content-Type", "text/plain")
    res.send(printSchema(schema))
  })

  return app
}