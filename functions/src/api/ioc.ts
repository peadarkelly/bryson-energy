import 'reflect-metadata'
import { Container } from 'inversify'

import { createClient } from '@google/maps'

import TYPES from './types'

import AddClubResolver from './resolvers/addClub.resolver'
import AddOrderResolver from './resolvers/addOrder.resolver'
import AddUserResolver from './resolvers/addUser.resolver'
import ClubResolver from './resolvers/club.resolver'
import ClubMembersResolver from './resolvers/clubMembers.resolver'
import ClubOrdersResolver from './resolvers/clubOrders.resolver'
import ClubsResolver from './resolvers/clubs.resolver'
import JoinClubResolver from './resolvers/joinClub.resolver'
import JoinOrderResolver from './resolvers/joinOrder.resolver'
import OrderResolver from './resolvers/order.resolver'
import OrderParticipantsResolver from './resolvers/orderParticipants.resolver'
import OrderStatusResolver from './resolvers/orderStatus.resolver'
import UserResolver from './resolvers/user.resolver'
import UserClubResolver from './resolvers/userClub.resolver'

import GraphqlMapper from './mappers/graphql.mapper'
import FirestoreMapper from './mappers/firestore.mapper'

import UserDao from '../firestore/daos/user.dao'
import ClubDao from '../firestore/daos/club.dao'
import ClubUserDao from '../firestore/daos/clubUser.dao'
import ClubOrderDao from '../firestore/daos/clubOrder.dao'
import OrderUserDao from '../firestore/daos/orderUser.dao'

const iocContainer = new Container()

iocContainer.bind(AddClubResolver).toSelf().inSingletonScope()
iocContainer.bind(AddOrderResolver).toSelf().inSingletonScope()
iocContainer.bind(AddUserResolver).toSelf().inSingletonScope()
iocContainer.bind(ClubResolver).toSelf().inSingletonScope()
iocContainer.bind(ClubMembersResolver).toSelf().inSingletonScope()
iocContainer.bind(ClubOrdersResolver).toSelf().inSingletonScope()
iocContainer.bind(ClubsResolver).toSelf().inSingletonScope()
iocContainer.bind(JoinClubResolver).toSelf().inSingletonScope()
iocContainer.bind(JoinOrderResolver).toSelf().inSingletonScope()
iocContainer.bind(OrderResolver).toSelf().inSingletonScope()
iocContainer.bind(OrderParticipantsResolver).toSelf().inSingletonScope()
iocContainer.bind(OrderStatusResolver).toSelf().inSingletonScope()
iocContainer.bind(UserResolver).toSelf().inSingletonScope()
iocContainer.bind(UserClubResolver).toSelf().inSingletonScope()

iocContainer.bind(GraphqlMapper).toSelf().inSingletonScope()
iocContainer.bind(FirestoreMapper).toSelf().inSingletonScope()

iocContainer.bind(UserDao).toSelf().inSingletonScope()
iocContainer.bind(ClubDao).toSelf().inSingletonScope()
iocContainer.bind(ClubUserDao).toSelf().inSingletonScope()
iocContainer.bind(ClubOrderDao).toSelf().inSingletonScope()
iocContainer.bind(OrderUserDao).toSelf().inSingletonScope()

iocContainer.bind(TYPES.GoogleMapsClient).toConstantValue(createClient({
  key: 'AIzaSyDhXecHlpCw7wsSxsLKtJLTNQ7xHJPO0Vo',
  Promise: Promise
}))

export default iocContainer
