import { https, HttpsFunction } from 'firebase-functions'
import { firestore as fire } from 'firebase-admin'
import setupGraphqlServer from './server'

export default (firestore: fire.Firestore): HttpsFunction => {
  return https.onRequest(setupGraphqlServer(firestore))
}
