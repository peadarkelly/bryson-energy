import { Component, Output, EventEmitter } from '@angular/core'
import { AddressSearchService } from './address-search.service'

@Component({
  selector: 'app-address-search',
  templateUrl: 'address-search.component.html',
  styleUrls: ['address-search.component.scss']
})
export class AddressSearchComponent {

  @Output()
  public addressSelected = new EventEmitter<string>()

  public query: string
  public placeId: string
  public addresses: google.maps.places.AutocompletePrediction[]

  public constructor(private addressSearchService: AddressSearchService) {}

  public async searchForAddress(): Promise<void> {
    this.addresses = await this.addressSearchService.searchForAddress(this.query)
  }

  public selectAddress(): void {
    this.addressSelected.emit(this.placeId)
  }
}
