import { Injectable } from '@angular/core'
import { HTTP, HTTPResponse } from '@ionic-native/http/ngx'
import { environment } from '../../../../../environments/environment'
import uuid from 'uuidv4'

@Injectable({
  providedIn: 'root'
})
export class AddressSearchService {

  private readonly API_BASE_URL = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?'
  private readonly DEFAULT_PARAMS: any = {
    key: environment.placesApiKey,
    sessiontoken: uuid(),
    components: 'country:uk',
    types: 'address'
  }

  public constructor(private http: HTTP) {}

  public async searchForAddress(query: string): Promise<google.maps.places.AutocompletePrediction[]> {
    const params: any = { ...this.DEFAULT_PARAMS, input: query }
    const response: HTTPResponse = await this.http.get(this.API_BASE_URL, params, {})
    return JSON.parse(response.data).predictions
  }

}
