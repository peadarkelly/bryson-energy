import 'reflect-metadata'
import { describe, it } from 'mocha'
import { assert } from 'chai'
import FirestoreMapper from '../../../../src/api/mappers/firestore.mapper'
import { User, UserInput, OrderInput, JoinOrderInput } from '../../../../src/api/models/graphql.models'
import { UserModel, ClubModel, ClubUserModel, ClubOrderModel, OrderUserModel } from '../../../../src/api/models/firestore.models'
import { generateGraphQLUserInput, generateGraphQLUser } from '../../../fixtures/userFixtures'
import { generateGraphQLOrderInput, generateGraphQLJoinOrderInput } from '../../../fixtures/orderFixtures'

describe('FirestoreMapper', () => {

  const mapper: FirestoreMapper = new FirestoreMapper()

  describe('mapToUserModel', () => {
    it('should map a graphql user input to a firestore user model', () => {
      const graphqlUserInput: UserInput = generateGraphQLUserInput()
      graphqlUserInput.firstName = 'someFirstname'
      graphqlUserInput.surname = 'someSurname'
      graphqlUserInput.email = 'some@mail.com'
      graphqlUserInput.contact = 'some contact'
      graphqlUserInput.placeId = 'somePlaceId'

      const firestoreUser: UserModel = mapper.mapToUserModel(graphqlUserInput)

      assert.equal(firestoreUser.firstName, 'someFirstname')
      assert.equal(firestoreUser.surname, 'someSurname')
      assert.equal(firestoreUser.email, 'some@mail.com')
      assert.equal(firestoreUser.contact, 'some contact')
      assert.equal(firestoreUser.placeId, 'somePlaceId')
    })
  })

  describe('mapToClubModel', () => {
    it('should map a graphql user to a firestore club model', () => {
      const graphqlUser: User = generateGraphQLUser()
      graphqlUser.firstName = 'someFirstname'
      graphqlUser.surname = 'someSurname'
      graphqlUser.placeId = 'somePlaceId'

      const firestoreClub: ClubModel = mapper.mapToClubModel(graphqlUser)

      assert.equal(firestoreClub.admin, 'someFirstname someSurname')
      assert.equal(firestoreClub.placeId, 'somePlaceId')
    })

    it('should default the number of members in the club to 1', () => {
      const graphqlUser: User = generateGraphQLUser()

      const firestoreClub: ClubModel = mapper.mapToClubModel(graphqlUser)

      assert.equal(firestoreClub.numberOfMembers, 1)
    })
  })

  describe('mapToClubUserModel', () => {
    it('should map a graphql user to a firestore club user model', () => {
      const graphqlUser: User = generateGraphQLUser()
      graphqlUser.firstName = 'someFirstname'
      graphqlUser.surname = 'someSurname'
      graphqlUser.email = 'some@mail.com'
      graphqlUser.contact = 'some contact'
      graphqlUser.placeId = 'somePlaceId'

      const firestoreClubUser: ClubUserModel = mapper.mapToClubUserModel(graphqlUser, true)

      assert.equal(firestoreClubUser.name, 'someFirstname someSurname')
      assert.isTrue(firestoreClubUser.isAdmin)
    })
  })

  describe('mapToClubOrderModel', () => {
    it('should create a firestore club order model and default to total volume and number of participants to 0', () => {
      const graphqlOrderInput: OrderInput = generateGraphQLOrderInput()

      const firestoreClubOrder: ClubOrderModel = mapper.mapToClubOrderModel(graphqlOrderInput)

      assert.equal(firestoreClubOrder.totalVolume, 0)
      assert.equal(firestoreClubOrder.numberOfParticipants, 0)
    })
  })

  describe('mapToOrderUserModel', () => {
    it('should map a graphql user and join order input to a firestore order user model', () => {
      const graphqlUser: User = generateGraphQLUser()
      graphqlUser.firstName = 'someFirstname'
      graphqlUser.surname = 'someSurname'

      const graphqlJoinOrderInput: JoinOrderInput = generateGraphQLJoinOrderInput()
      graphqlJoinOrderInput.volume = 500
      graphqlJoinOrderInput.cost = 300

      const firestoreOrderUser: OrderUserModel = mapper.mapToOrderUserModel(graphqlUser, graphqlJoinOrderInput)

      assert.equal(firestoreOrderUser.name, 'someFirstname someSurname')
      assert.equal(firestoreOrderUser.volume, 500)
      assert.equal(firestoreOrderUser.cost, 300)
    })
  })
})
