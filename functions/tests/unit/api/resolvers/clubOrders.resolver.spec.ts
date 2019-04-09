import { describe, it, before } from 'mocha'
import { assert } from 'chai'
import { mock, instance, when, anything } from 'ts-mockito'
import ClubOrdersResolver from '../../../../src/api/resolvers/clubOrders.resolver'
import GraphqlMapper from '../../../../src/api/mappers/graphql.mapper'
import { Order, Club } from '../../../../src/api/models/graphql.models'
import { CTX, toBaseModel } from '../../../fixtures/firestoreFixtures'
import ClubOrderDao from '../../../../src/firestore/daos/clubOrder.dao'
import { generateGraphQLClub } from '../../../fixtures/clubFixtures'
import { generateGraphQLOrder, generateFirestoreClubOrder } from '../../../fixtures/orderFixtures'

describe('ClubOrdersResolver', () => {

  let resolver: ClubOrdersResolver

  let graphqlMapper: GraphqlMapper
  let clubOrderDao: ClubOrderDao

  before(() => {
    graphqlMapper = mock(GraphqlMapper)
    clubOrderDao = mock(ClubOrderDao)

    resolver = new ClubOrdersResolver(
      instance(graphqlMapper),
      instance(clubOrderDao)
    )
  })

  describe('resolve', () => {
    it('should return an empty list if the parent club does not exist', async () => {
      const club: Club = generateGraphQLClub()
      club.clubId = null

      const result: Order[] = await resolver.resolve(club, null, CTX)

      assert.isEmpty(result)
    })

    it('should return a list of orders belonging to the parent club', async () => {
      const club: Club = generateGraphQLClub()
      club.clubId = 'someClubId'

      const order: Order = generateGraphQLOrder()

      when(clubOrderDao.getClubOrders(CTX, 'someClubId')).thenResolve([toBaseModel('someOrderId', generateFirestoreClubOrder())])
      when(graphqlMapper.mapToOrder(anything(), anything())).thenReturn(order)

      const result: Order[] = await resolver.resolve(club, null, CTX)

      assert.equal(result.length, 1)
      assert.equal(result[0], order)
    })
  })
})
