import { Component, Input, Output, EventEmitter } from '@angular/core'
import { OrderSummary } from '../../../graphql/generated'

@Component({
  selector: 'app-order-card',
  templateUrl: 'order-card.component.html',
  styleUrls: ['order-card.component.scss']
})
export class OrderCardComponent {

  @Input() public order: OrderSummary.Orders

  @Output() viewOrder = new EventEmitter<OrderSummary.Orders>()

  public view(order: OrderSummary.Orders): void {
    this.viewOrder.emit(order)
  }
}
