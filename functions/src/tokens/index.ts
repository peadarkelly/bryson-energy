import { https, HttpsFunction } from 'firebase-functions'
import { firestore as fire } from 'firebase-admin'
import { TokenModel } from '../firestore/firestore.models'
import TokenDao from '../firestore/daos/token.dao'

export default (firestore: fire.Firestore): HttpsFunction => {
  return https.onCall(async (data: TokenModel) => new TokenDao().createToken({ firestore }, data))
}
