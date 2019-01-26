import { https } from 'firebase-functions'
import * as admin from 'firebase-admin'
import { Application } from 'express'
import setupGraphqlServer from './graphql/server'

admin.initializeApp()

const graphQLServer: Application = setupGraphqlServer(admin.firestore())

export const api = https.onRequest(graphQLServer)
