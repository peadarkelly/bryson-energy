import * as functions from 'firebase-functions'
import { messaging as msg, firestore as fire } from 'firebase-admin'
import ClubUserDao from '../firestore/daos/clubUser.dao'
import { BaseModel, ClubUserModel, TokenModel } from '../firestore/firestore.models'
import TokenDao from '../firestore/daos/token.dao'

export default (firestore: fire.Firestore, messaging: msg.Messaging) => {
  return functions.firestore
    .document('clubOrders/{clubId}/orders/{orderId}')
    .onCreate(snap => sendOrderNotificationToClubMembers(firestore, messaging, snap))
}

async function sendOrderNotificationToClubMembers(firestore: fire.Firestore, messaging: msg.Messaging, snap: fire.DocumentSnapshot) {
  const clubId: string = (await snap.ref.parent.parent.get()).ref.id

  const tokens: string[] = await getTokensToReceive(firestore, clubId)

  const payload: msg.MessagingPayload = buildNotificationPayload()

  return messaging.sendToDevice(tokens, payload)
}

async function getTokensToReceive(firestore: fire.Firestore, clubId: string): Promise<string[]> {
  const userIds: string[] = await getClubUserIds(firestore, clubId)

  return getTokensForUserIds(firestore, userIds)
}

async function getClubUserIds(firestore: fire.Firestore, clubId: string): Promise<string[]> {
  const users: BaseModel<ClubUserModel>[] = await new ClubUserDao().getClubUsers({ firestore }, clubId)

  return users.map(user => user.id)
}

async function getTokensForUserIds(firestore: fire.Firestore, userIds: string[]): Promise<string[]> {
  const tokens: BaseModel<TokenModel>[] = await new TokenDao().getTokens({ firestore })

  return tokens.filter(token => userIds.includes(token.data.userId)).map(token => token.id)
}

function buildNotificationPayload(): msg.MessagingPayload {
  return {
    notification: {
      title: 'New club order initiated',
      body: `A new order has been initiated for your club!`
    }
  }
}