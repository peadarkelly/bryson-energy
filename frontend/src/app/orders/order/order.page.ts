import { Component, OnInit } from '@angular/core'
import { NavController } from '@ionic/angular'
import { GetOrderDetailsGQL, GetOrderDetails } from '../../graphql/generated'
import { ApolloQueryResult } from 'apollo-client'
import { Storage } from '@ionic/storage'

@Component({
  selector: 'app-order',
  templateUrl: 'order.page.html',
  styleUrls: ['order.page.scss']
})
export class OrderPage implements OnInit {

  public order: GetOrderDetails.Orders
  public userOrder: GetOrderDetails.Participants

  public constructor(
    private navCtrl: NavController,
    private storage: Storage,
    private getOrderDetailsGQL: GetOrderDetailsGQL
  ) {}

  public ngOnInit() {
    this.fetchOrder()
  }

  private async fetchOrder(): Promise<void> {
    const user: string = await this.storage.get('user')

    this.getOrderDetailsGQL.fetch({ userId: user }).subscribe(async ({ data }: ApolloQueryResult<GetOrderDetails.Query>) => {
      const order: GetOrderDetails.Orders = data.getUser.club.orders[0]

      this.userOrder = await this.getParticipantInfo(order)
      this.order = order
    })
  }

  private async getParticipantInfo(order: GetOrderDetails.Orders): Promise<GetOrderDetails.Participants> {
    const user = await this.storage.get('user')

    const filteredParticipants: GetOrderDetails.Participants[] = order.participants.filter(p => p.userId === user)

    if (filteredParticipants.length > 0) {
      return filteredParticipants[0]
    }

    return null
  }

  public joinOrder(): void {
    this.navCtrl.navigateForward(`/orders/${this.order.orderId}/join`)
  }
}
