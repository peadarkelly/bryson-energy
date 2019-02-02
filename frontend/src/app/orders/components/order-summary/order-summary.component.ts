import { Component, Input, Output, EventEmitter } from '@angular/core'
import { GetOrderSummary } from '../../../graphql/generated'

@Component({
  selector: 'app-order-summary',
  templateUrl: 'order-summary.component.html',
  styleUrls: ['order-summary.component.scss']
})
export class OrderSummaryComponent {

  @Input() public order: GetOrderSummary.Orders

  @Output() viewOrder = new EventEmitter<GetOrderSummary.Orders>()

  public view(order: GetOrderSummary.Orders): void {
    this.viewOrder.emit(order)
  }
}
