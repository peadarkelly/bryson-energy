import { https } from 'firebase-functions'
import * as admin from 'firebase-admin'
import { Application } from 'express'
import setupGraphqlServer from './graphql/server'

admin.initializeApp()

// export const myDbFunction = functions.https.onRequest(async (request, response) => {
//   admin.firestore().collection('/users').get().then((snap) => {
//     snap.forEach(s => response.send(s.data()))

//   }).catch(err => response.send(err))
// })

const graphQLServer: Application = setupGraphqlServer()

export const api = https.onRequest(graphQLServer)
