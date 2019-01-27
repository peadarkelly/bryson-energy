import 'reflect-metadata'
import { Container } from 'inversify'

import AddClubResolver from './resolvers/addClub.resolver'
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
import ClubUserDao from './daos/clubUser.dao'

const iocContainer = new Container()

iocContainer.bind<AddClubResolver>(AddClubResolver).toSelf()
iocContainer.bind<AddUserResolver>(AddUserResolver).toSelf()
iocContainer.bind<ClubMembersbResolver>(ClubMembersbResolver).toSelf()
iocContainer.bind<GetClubsResolver>(GetClubsResolver).toSelf()
iocContainer.bind<GetUserResolver>(GetUserResolver).toSelf()
iocContainer.bind<JoinClubResolver>(JoinClubResolver).toSelf()
iocContainer.bind<UserClubResolver>(UserClubResolver).toSelf()

iocContainer.bind<GraphqlMapper>(GraphqlMapper).toSelf()
iocContainer.bind<FirestoreMapper>(FirestoreMapper).toSelf()

iocContainer.bind<UserDao>(UserDao).toSelf()
iocContainer.bind<ClubDao>(ClubDao).toSelf()
iocContainer.bind<ClubUserDao>(ClubUserDao).toSelf()

export default iocContainer
