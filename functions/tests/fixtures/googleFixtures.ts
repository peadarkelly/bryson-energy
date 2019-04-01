import { GoogleMapsClient, GoogleMapsClientEndpoint, DistanceMatrixRequest, DistanceMatrixResponse, ClientResponse } from '@google/maps'
import * as sinon from 'sinon'

export function getGoogleClient(response: ClientResponse<DistanceMatrixResponse>): GoogleMapsClient {
  return <GoogleMapsClient>{
    distanceMatrix: <GoogleMapsClientEndpoint<DistanceMatrixRequest, DistanceMatrixResponse>>sinon.stub().returns({
      asPromise: sinon.stub().returns(Promise.resolve(response))
    })
  }
}