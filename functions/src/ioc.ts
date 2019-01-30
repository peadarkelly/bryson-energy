import 'reflect-metadata'
import { Container } from 'inversify'

import AddClubResolver from './resolvers/addClub.resolver'
import AddOrderResolver from './resolvers/addOrder.resolver'
import AddUserResolver from './resolvers/addUser.resolver'
import ClubMembersbResolver from './resolvers/clubMembers.resolver'
import GetClubsResolver from './resolvers/getClubs.resolver'
import GetUserResolver from './resolvers/getUser.resolver'
import JoinClubResolver from './resolvers/joinClub.resolver'
import UserClubResolver from './resolvers/userClub.resolver'

import GraphqlMapper from './mappers/graphql.mapper'
import FirestoreMapper from './mappers/firestore.mapper'

import UserDao from './daos/user.dao'
import ClubDao from './daos/club.dao'
import ClubOrderDao from './daos/order.dao'
import ClubUserDao from './daos/clubUser.dao'

const iocContainer = new Container()

iocContainer.bind(AddClubResolver).toSelf()
iocContainer.bind(AddOrderResolver).toSelf()
iocContainer.bind(AddUserResolver).toSelf()
iocContainer.bind(ClubMembersbResolver).toSelf()
iocContainer.bind(GetClubsResolver).toSelf()
iocContainer.bind(GetUserResolver).toSelf()
iocContainer.bind(JoinClubResolver).toSelf()
iocContainer.bind(UserClubResolver).toSelf()

iocContainer.bind(GraphqlMapper).toSelf()
iocContainer.bind(FirestoreMapper).toSelf()

iocContainer.bind(UserDao).toSelf()
iocContainer.bind(ClubDao).toSelf()
iocContainer.bind(ClubOrderDao).toSelf()
iocContainer.bind(ClubUserDao).toSelf()

export default iocContainer
