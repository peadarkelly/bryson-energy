import { Component, OnInit, Input } from '@angular/core'
import { OrderSummary } from '../../../graphql/generated'
import * as moment from 'moment'

type StatusText = 'Open' | 'Delivery due' | 'Completed'
type StatusClass = 'success' | 'primary' | 'secondary'

interface OrderStatus {
  text: StatusText
  class: StatusClass
}

@Component({
  selector: 'app-order-status',
  templateUrl: 'order-status.component.html',
  styleUrls: ['order-status.component.scss']
})
export class OrderStatusComponent implements OnInit {

  @Input() public order: OrderSummary.Orders
  public status: OrderStatus

  public constructor() {}

  public ngOnInit() {
    this.status = this.getOrderStatus()
  }

  private getOrderStatus(): OrderStatus {
    const now: moment.Moment = moment()
    const deadlineDate: moment.Moment = moment(this.order.deadlineDate)

    if (now.isBefore(deadlineDate)) {
      return {
        text: 'Open',
        class: 'success'
      }
    }

    return {
      text: 'Completed',
      class: 'secondary'
    }
  }
}
