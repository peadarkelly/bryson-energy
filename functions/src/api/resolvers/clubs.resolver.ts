import { injectable, inject } from 'inversify'
import { GoogleMapsClient, ClientResponse, DistanceMatrixResponse, DistanceMatrixRowElement } from '@google/maps'
import { ClubsQueryArgs, Club } from '../models/graphql.models'
import { Context, BaseModel, ClubModel, UserModel } from '../../firestore/firestore.models'
import Resolver from './resolver'
import GraphqlMapper from '../mappers/graphql.mapper'
import UserDao from '../../firestore/daos/user.dao'
import ClubDao from '../../firestore/daos/club.dao'
import TYPES from '../types'

@injectable()
export default class ClubsResolver implements Resolver {

  public constructor(
    private graphqlMapper: GraphqlMapper,
    private userDao: UserDao,
    private clubDao: ClubDao,
    @inject(TYPES.GoogleMapsClient) private google: GoogleMapsClient
  ) {}

  public async resolve(parent: null, { userId }: ClubsQueryArgs, ctx: Context): Promise<Club[]> {
    const user: BaseModel<UserModel> = await this.userDao.getUser(ctx, userId)
    if (!user) {
      throw new Error('userId does not exist')
    }

    const clubs: BaseModel<ClubModel>[] = await this.clubDao.getClubs(ctx)
    if (clubs.length === 0) {
      return []
    }

    await this.filterClubsInRange(user, clubs)

    return clubs.filter(club => club).map(club => this.graphqlMapper.mapToClub(club.id, club.data))
  }

  private async filterClubsInRange(user: BaseModel<UserModel>, clubs: BaseModel<ClubModel>[]): Promise<void> {
    const clubsWithDistanceInfo: DistanceMatrixRowElement[] = await this.getClubsDistanceInfo(user, clubs)

    for (let i = 0; i < clubsWithDistanceInfo.length; i++) {
      const club: DistanceMatrixRowElement = clubsWithDistanceInfo[i]

      if (this.isOutOfRange(club)) {
        clubs[i] = null
      }
    }
  }

  private async getClubsDistanceInfo(user: BaseModel<UserModel>, clubs: BaseModel<ClubModel>[]): Promise<DistanceMatrixRowElement[]> {
    const response: ClientResponse<DistanceMatrixResponse> = await this.google.distanceMatrix({
      origins: [`place_id:${user.data.placeId}`],
      destinations: clubs.map(club => `place_id:${club.data.placeId}`),
      units: 'metric',
      region: 'uk'
    }).asPromise()

    return response.json.rows[0].elements
  }

  private isOutOfRange(club: DistanceMatrixRowElement): boolean {
    return this.getDistance(club) > 5000
  }

  private getDistance(club: DistanceMatrixRowElement): number {
    return club.distance.value
  }
}
