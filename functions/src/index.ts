import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import apiHandler from './api/index'
import tokensHandler from './tokens/index'
import orderInitiatedNotificationHandler from './orderInitiatedNotification/index'

admin.initializeApp(functions.config().admin)

export const api = apiHandler(admin.firestore())
export const tokens = tokensHandler(admin.firestore())
export const orderInitiatedNotification = orderInitiatedNotificationHandler(admin.firestore(), admin.messaging())
