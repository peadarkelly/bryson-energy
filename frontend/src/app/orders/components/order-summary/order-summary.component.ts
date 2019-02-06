import { Component, Input } from '@angular/core'
import { OrderSummary } from '../../../graphql/generated'

@Component({
  selector: 'app-order-summary',
  templateUrl: 'order-summary.component.html',
  styleUrls: ['order-summary.component.scss']
})
export class OrderSummaryComponent {

  @Input() public order: OrderSummary.Orders

}
