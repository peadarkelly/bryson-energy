import { describe, it, before } from 'mocha'
import { assert } from 'chai'
import { mock, instance, when, verify, anything } from 'ts-mockito'
import AddOrderResolver from '../../../../src/api/resolvers/addOrder.resolver'
import FirestoreMapper from '../../../../src/api/mappers/firestore.mapper'
import GraphqlMapper from '../../../../src/api/mappers/graphql.mapper'
import ClubDao from '../../../../src/api/daos/club.dao'
import ClubOrderDao from '../../../../src/api/daos/clubOrder.dao'
import { AddOrderMutationArgs, Order } from '../../../../src/api/models/graphql.models'
import { generateGraphQLOrderInput, generateGraphQLOrder } from '../../../fixtures/orderFixtures'
import { CTX, toBaseModel } from '../../../fixtures/firestoreFixtures'
import { generateFirestoreClub } from '../../../fixtures/clubFixtures'

describe('AddOrderResolver', () => {

  let resolver: AddOrderResolver

  let firestoreMapper: FirestoreMapper
  let graphqlMapper: GraphqlMapper
  let clubDao: ClubDao
  let clubOrderDao: ClubOrderDao

  const ARGS: AddOrderMutationArgs = { input: generateGraphQLOrderInput() }

  before(() => {
    firestoreMapper = mock(FirestoreMapper)
    graphqlMapper = mock(GraphqlMapper)
    clubDao = mock(ClubDao)
    clubOrderDao = mock(ClubOrderDao)

    resolver = new AddOrderResolver(
      instance(firestoreMapper),
      instance(graphqlMapper),
      instance(clubDao),
      instance(clubOrderDao)
    )
  })

  describe('resolve', () => {
    it('should throw an error if no club exists with the supplied club ID', async () => {
      when(clubDao.getClub(CTX, anything())).thenResolve(null)

      try {
        await resolver.resolve(null, ARGS, CTX)
        assert.fail()
      } catch (err) {
        assert.exists(err, 'clubId does not exist')
      }
    })

    it('should add an order to the database', async () => {
      when(clubDao.getClub(CTX, anything())).thenResolve(toBaseModel('someClubId', generateFirestoreClub()))
      when(clubOrderDao.createClubOrder(CTX, anything(), anything())).thenResolve(toBaseModel('someOrderId', null))

      await resolver.resolve(null, ARGS, CTX)

      verify(clubOrderDao.createClubOrder(CTX, anything(), anything())).called()
    })

    it('should return the created order', async () => {
      const order: Order = generateGraphQLOrder()

      when(clubDao.getClub(CTX, anything())).thenResolve(toBaseModel('someClubId', generateFirestoreClub()))
      when(clubOrderDao.createClubOrder(CTX, anything(), anything())).thenResolve(toBaseModel('someOrderId', null))
      when(graphqlMapper.mapToOrder(anything(), anything())).thenReturn(order)

      const result: Order = await resolver.resolve(null, ARGS, CTX)

      assert.equal(result, order)
    })
  })
})
