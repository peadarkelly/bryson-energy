import { Component, OnInit } from '@angular/core'
import { NavController } from '@ionic/angular'
import { OrderDetailsGQL, OrderDetails } from '../../graphql/generated'
import { ApolloQueryResult } from 'apollo-client'
import { Storage } from '@ionic/storage'

@Component({
  selector: 'app-order',
  templateUrl: 'order.page.html',
  styleUrls: ['order.page.scss']
})
export class OrderPage implements OnInit {

  public order: OrderDetails.Orders
  public userOrder: OrderDetails.Participants

  public constructor(
    private navCtrl: NavController,
    private storage: Storage,
    private orderDetailsGQL: OrderDetailsGQL
  ) {}

  public ngOnInit(): void {
    this.fetchOrder()
  }

  public ionViewDidEnter(): void {
    this.fetchOrder()
  }

  public refresh(event): void {
    this.fetchOrder().then(() => event.target.complete())
  }

  private async fetchOrder(): Promise<void> {
    const user: string = await this.storage.get('user')

    this.orderDetailsGQL.fetch({ userId: user }).subscribe(async ({ data }: ApolloQueryResult<OrderDetails.Query>) => {
      const order: OrderDetails.Orders = data.user.club.orders[0]

      this.userOrder = await this.getParticipantInfo(order)
      this.order = order
    })
  }

  private async getParticipantInfo(order: OrderDetails.Orders): Promise<OrderDetails.Participants> {
    const user = await this.storage.get('user')

    const filteredParticipants: OrderDetails.Participants[] = order.participants.filter(p => p.userId === user)

    if (filteredParticipants.length > 0) {
      return filteredParticipants[0]
    }

    return null
  }

  public joinOrder(): void {
    this.navCtrl.navigateForward(`/orders/${this.order.orderId}/join`)
  }
}
