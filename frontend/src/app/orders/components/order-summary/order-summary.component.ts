import { Component, Input, Output, EventEmitter } from '@angular/core'
import { OrderSummary } from '../../../graphql/generated'

@Component({
  selector: 'app-order-summary',
  templateUrl: 'order-summary.component.html',
  styleUrls: ['order-summary.component.scss']
})
export class OrderSummaryComponent {

  @Input() public order: OrderSummary.Orders

  @Output() viewOrder = new EventEmitter<OrderSummary.Orders>()

  public view(order: OrderSummary.Orders): void {
    this.viewOrder.emit(order)
  }
}
