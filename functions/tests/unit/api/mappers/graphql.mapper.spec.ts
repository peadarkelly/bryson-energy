import 'reflect-metadata'
import { describe, it } from 'mocha'
import { assert } from 'chai'
import GraphqlMapper from '../../../../src/api/mappers/graphql.mapper'
import { User, Club, ClubMember, Order, OrderParticipant } from '../../../../src/api/models/graphql.models'
import { UserModel, ClubModel, ClubUserModel, ClubOrderModel, OrderUserModel } from '../../../../src/api/models/firestore.models'
import { generateFirestoreUser } from '../../../fixtures/userFixtures'
import { generateFirestoreClub, generateFirestoreClubUser } from '../../../fixtures/clubFixtures'
import { generateFirestoreClubOrder, generateFirestoreOrderUser } from '../../../fixtures/orderFixtures'

describe('GraphqlMapper', () => {

  const mapper: GraphqlMapper = new GraphqlMapper()

  describe('mapToUser', () => {
    it('should map a firstore user to a graphql user ', () => {
      const firstoreUser: UserModel = generateFirestoreUser()
      firstoreUser.firstName = 'someFirstname'
      firstoreUser.surname = 'someSurname'
      firstoreUser.email = 'some@mail.com'
      firstoreUser.contact = 'some contact'
      firstoreUser.placeId = 'somePlaceId'
      firstoreUser.clubId = 'someClubId'

      const graphqlUser: User = mapper.mapToUser('someUserId', firstoreUser)

      assert.equal(graphqlUser.userId, 'someUserId')
      assert.equal(graphqlUser.firstName, 'someFirstname')
      assert.equal(graphqlUser.surname, 'someSurname')
      assert.equal(graphqlUser.email, 'some@mail.com')
      assert.equal(graphqlUser.contact, 'some contact')
      assert.equal(graphqlUser.placeId, 'somePlaceId')
      assert.equal(graphqlUser.clubId, 'someClubId')
    })
  })

  describe('mapToClub', () => {
    it('should map a firstore club to a graphql club ', () => {
      const firestoreClub: ClubModel = generateFirestoreClub()
      firestoreClub.admin = 'some admin'
      firestoreClub.numberOfMembers = 10

      const graphqlClub: Club = mapper.mapToClub('someClubId', firestoreClub)

      assert.equal(graphqlClub.clubId, 'someClubId')
      assert.equal(graphqlClub.admin, 'some admin')
      assert.equal(graphqlClub.numberOfMembers, 10)
    })
  })

  describe('mapToClubMember', () => {
    it('should map a firstore club user to a graphql club member ', () => {
      const firstoreClubUser: ClubUserModel = generateFirestoreClubUser()
      firstoreClubUser.name = 'some user'
      firstoreClubUser.isAdmin = true

      const graphqlClubMember: ClubMember = mapper.mapToClubMember('someUserId', firstoreClubUser)

      assert.equal(graphqlClubMember.userId, 'someUserId')
      assert.equal(graphqlClubMember.name, 'some user')
      assert.isTrue(graphqlClubMember.isAdmin)
    })
  })

  describe('mapToOrder', () => {
    it('should map a firstore club order to a graphql order ', () => {
      const firstoreClubOrder: ClubOrderModel = generateFirestoreClubOrder()
      firstoreClubOrder.totalVolume = 500
      firstoreClubOrder.numberOfParticipants = 10

      const graphqlOrder: Order = mapper.mapToOrder('someOrderId', firstoreClubOrder)

      assert.equal(graphqlOrder.orderId, 'someOrderId')
      assert.equal(graphqlOrder.totalVolume, 500)
      assert.equal(graphqlOrder.numberOfParticipants, 10)
    })
  })

  describe('mapToOrderParticipant', () => {
    it('should map a firstore order user to a graphql order participant', () => {
      const firstoreOrderUser: OrderUserModel = generateFirestoreOrderUser()
      firstoreOrderUser.name = 'some name'
      firstoreOrderUser.cost = 300
      firstoreOrderUser.volume = 500
      firstoreOrderUser.cashback = 10

      const graphqlOrderParticipant: OrderParticipant = mapper.mapToOrderParticipant('someUserId', firstoreOrderUser)

      assert.equal(graphqlOrderParticipant.userId, 'someUserId')
      assert.equal(graphqlOrderParticipant.name, 'some name')
      assert.equal(graphqlOrderParticipant.cost, 300)
      assert.equal(graphqlOrderParticipant.volume, 500)
      assert.equal(graphqlOrderParticipant.cashback, 10)
    })

    it('should default cashback to 0 if none exists', () => {
      const firstoreOrderUser: OrderUserModel = generateFirestoreOrderUser()
      firstoreOrderUser.cashback = null

      const graphqlOrderParticipant: OrderParticipant = mapper.mapToOrderParticipant('someUserId', firstoreOrderUser)

      assert.equal(graphqlOrderParticipant.cashback, 0)
    })
  })
})
