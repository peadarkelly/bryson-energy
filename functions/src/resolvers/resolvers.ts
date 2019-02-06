import iocContainer from '../ioc'

import Resolver from './resolver'

import UserResolver from './user.resolver'
import ClubsResolver from './clubs.resolver'
import ClubMembersResolver from './clubMembers.resolver'
import ClubOrdersResolver from './clubOrders.resolver'
import UserClubResolver from './userClub.resolver'
import OrderParticipantsResolver from './orderParticipants.resolver'
import OrderStatusResolver from './orderStatus.resolver'
import AddUserResolver from './addUser.resolver'
import AddClubResolver from './addClub.resolver'
import JoinClubResolver from './joinClub.resolver'
import AddOrderResolver from './addOrder.resolver'
import JoinOrderResolver from './joinOrder.resolver'

export default {
  Query: {
    user: getResolver(UserResolver),
    clubs: getResolver(ClubsResolver)
  },
  Club: {
    members: getResolver(ClubMembersResolver),
    orders: getResolver(ClubOrdersResolver)
  },
  User: {
    club: getResolver(UserClubResolver)
  },
  Order: {
    participants: getResolver(OrderParticipantsResolver),
    status: getResolver(OrderStatusResolver)
  },
  Mutation: {
    addUser: getResolver(AddUserResolver),
    addClub: getResolver(AddClubResolver),
    joinClub: getResolver(JoinClubResolver),
    addOrder: getResolver(AddOrderResolver),
    joinOrder: getResolver(JoinOrderResolver)
  }
}

function getResolver<T>(clazz: { new (...args: any[]): T }) {
  const resolver: Resolver = iocContainer.get(clazz)
  return resolver.resolve.bind(resolver)
}
