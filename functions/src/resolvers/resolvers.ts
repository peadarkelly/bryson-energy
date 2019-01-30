import iocContainer from '../ioc'

import Resolver from './resolver'

import GetUserResolver from './getUser.resolver'
import GetClubsResolver from './getClubs.resolver'
import ClubMembersResolver from './clubMembers.resolver'
import UserClubResolver from './userClub.resolver'
import AddUserResolver from './addUser.resolver'
import AddClubResolver from './addClub.resolver'
import JoinClubResolver from './joinClub.resolver'
import AddOrderResolver from './addOrder.resolver'

export default {
  Query: {
    getUser: getResolver(GetUserResolver),
    getClubs: getResolver(GetClubsResolver),
  },
  Club: {
    members: getResolver(ClubMembersResolver),
  },
  User: {
    club: getResolver(UserClubResolver),
  },
  Mutation: {
    addUser: getResolver(AddUserResolver),
    addClub: getResolver(AddClubResolver),
    joinClub: getResolver(JoinClubResolver),
    addOrder: getResolver(AddOrderResolver)
  }
}

function getResolver<T>(clazz: { new (...args: any[]): T }) {
  const resolver: Resolver = iocContainer.get(clazz)
  return resolver.resolve.bind(resolver)
}
