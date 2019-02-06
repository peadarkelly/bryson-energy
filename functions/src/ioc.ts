import 'reflect-metadata'
import { Container } from 'inversify'

import AddClubResolver from './resolvers/addClub.resolver'
import AddOrderResolver from './resolvers/addOrder.resolver'
import AddUserResolver from './resolvers/addUser.resolver'
import ClubMembersResolver from './resolvers/clubMembers.resolver'
import ClubOrdersResolver from './resolvers/clubOrders.resolver'
import ClubsResolver from './resolvers/clubs.resolver'
import JoinClubResolver from './resolvers/joinClub.resolver'
import JoinOrderResolver from './resolvers/joinOrder.resolver'
import OrderParticipantsResolver from './resolvers/orderParticipants.resolver'
import OrderStatusResolver from './resolvers/orderStatus.resolver'
import UserResolver from './resolvers/user.resolver'
import UserClubResolver from './resolvers/userClub.resolver'

import GraphqlMapper from './mappers/graphql.mapper'
import FirestoreMapper from './mappers/firestore.mapper'

import UserDao from './daos/user.dao'
import ClubDao from './daos/club.dao'
import ClubUserDao from './daos/clubUser.dao'
import ClubOrderDao from './daos/clubOrder.dao'
import OrderUserDao from './daos/orderUser.dao'

const iocContainer = new Container()

iocContainer.bind(AddClubResolver).toSelf()
iocContainer.bind(AddOrderResolver).toSelf()
iocContainer.bind(AddUserResolver).toSelf()
iocContainer.bind(ClubMembersResolver).toSelf()
iocContainer.bind(ClubOrdersResolver).toSelf()
iocContainer.bind(ClubsResolver).toSelf()
iocContainer.bind(JoinClubResolver).toSelf()
iocContainer.bind(JoinOrderResolver).toSelf()
iocContainer.bind(OrderParticipantsResolver).toSelf()
iocContainer.bind(OrderStatusResolver).toSelf()
iocContainer.bind(UserResolver).toSelf()
iocContainer.bind(UserClubResolver).toSelf()

iocContainer.bind(GraphqlMapper).toSelf()
iocContainer.bind(FirestoreMapper).toSelf()

iocContainer.bind(UserDao).toSelf()
iocContainer.bind(ClubDao).toSelf()
iocContainer.bind(ClubUserDao).toSelf()
iocContainer.bind(ClubOrderDao).toSelf()
iocContainer.bind(OrderUserDao).toSelf()

export default iocContainer
