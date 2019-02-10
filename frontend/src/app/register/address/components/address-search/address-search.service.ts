import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../../environments/environment'
import uuid from 'uuidv4'

interface AutocompleteResponse {
  predictions: google.maps.places.AutocompletePrediction[]
}

@Injectable({
  providedIn: 'root'
})
export class AddressSearchService {

  private readonly API_BASE_URL = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?components=country:uk&types=address'
  private readonly QUERY_URL = `${this.API_BASE_URL}&key=${environment.placesApiKey}&sessiontoken=${uuid()}`

  public constructor(private http: HttpClient) {}

  public async searchForAddress(query: string): Promise<google.maps.places.AutocompletePrediction[]> {
    const response: AutocompleteResponse = <AutocompleteResponse>(await this.http.get(`${this.QUERY_URL}&input=${query}`).toPromise())
    return response.predictions
  }

}
