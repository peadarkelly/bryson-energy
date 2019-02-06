import { Component, OnInit, Input } from '@angular/core'
import { OrderStatus } from '../../../graphql/generated'

enum StatusText {
  OPEN = 'Open',
  DELIVERY_DUE = 'Delivery due',
  COMPLETED = 'Completed',
}

enum StatusClass {
  OPEN = 'success',
  DELIVERY_DUE = 'primary',
  COMPLETED = 'secondary',
}

@Component({
  selector: 'app-order-status',
  templateUrl: 'order-status.component.html',
  styleUrls: ['order-status.component.scss']
})
export class OrderStatusComponent implements OnInit {

  @Input()
  public status: OrderStatus

  public text: StatusText
  public class: StatusClass

  public ngOnInit() {
    this.text = StatusText[this.status]
    this.class = StatusClass[this.status]
  }
}
