import getUserResolver from './getUser.resolver'
import getClubsResolver from './getClubs.resolver'
import clubMembersResolver from './clubMembers.resolver'
import userClubResolver from './userClub.resolver'
import addUserResolver from './addUser.resolver'
import addClubResolver from './addClub.resolver'
import joinClubResolver from './joinClub.resolver'

export default {
  Query: {
    getUser: getUserResolver,
    getClubs: getClubsResolver
  },
  Club: {
    members: clubMembersResolver
  },
  User: {
    club: userClubResolver
  },
  Mutation: {
    addUser: addUserResolver,
    addClub: addClubResolver,
    joinClub: joinClubResolver
  }
}
