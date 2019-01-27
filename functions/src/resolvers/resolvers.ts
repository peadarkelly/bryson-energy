import iocContainer from '../ioc'

import GetUserResolver from './getUser.resolver'
import GetClubsResolver from './getClubs.resolver'
import ClubMembersResolver from './clubMembers.resolver'
import UserClubResolver from './userClub.resolver'
import AddUserResolver from './addUser.resolver'
import AddClubResolver from './addClub.resolver'
import JoinClubResolver from './joinClub.resolver'

const getUserResolver: GetUserResolver = iocContainer.get(GetUserResolver)
const getClubsResolver: GetClubsResolver = iocContainer.get(GetClubsResolver)
const clubMembersResolver: ClubMembersResolver = iocContainer.get(ClubMembersResolver)
const userClubResolver: UserClubResolver = iocContainer.get(UserClubResolver)
const addUserResolver: AddUserResolver = iocContainer.get(AddUserResolver)
const addClubResolver: AddClubResolver = iocContainer.get(AddClubResolver)
const joinClubResolver: JoinClubResolver = iocContainer.get(JoinClubResolver)

export default {
  Query: {
    getUser: getUserResolver.resolve.bind(getUserResolver),
    getClubs: getClubsResolver.resolve.bind(getClubsResolver)
  },
  Club: {
    members: clubMembersResolver.resolve.bind(clubMembersResolver)
  },
  User: {
    club: userClubResolver.resolve.bind(userClubResolver)
  },
  Mutation: {
    addUser: addUserResolver.resolve.bind(addUserResolver),
    addClub: addClubResolver.resolve.bind(addClubResolver),
    joinClub: joinClubResolver.resolve.bind(getClubsResolver)
  }
}
