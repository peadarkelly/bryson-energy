import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import apiHandler from './api/index'

admin.initializeApp(functions.config().admin)

export const api = apiHandler(admin.firestore())
