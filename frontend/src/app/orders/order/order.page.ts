import { Component, OnInit } from '@angular/core'
import { NavController } from '@ionic/angular'
import { OrderDetailsGQL, OrderDetails } from '../../graphql/generated'
import { ApolloQueryResult } from 'apollo-client'
import { Storage } from '@ionic/storage'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-order',
  templateUrl: 'order.page.html',
  styleUrls: ['order.page.scss']
})
export class OrderPage implements OnInit {

  public order: OrderDetails.Order
  public userOrder: OrderDetails.Participants

  private orderId: string

  public constructor(
    private route: ActivatedRoute,
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
    this.orderId = this.route.snapshot.paramMap.get('orderId')

    this.orderDetailsGQL.fetch(await this.getVariables()).subscribe(async ({ data }: ApolloQueryResult<OrderDetails.Query>) => {
      const order: OrderDetails.Order = data.order

      this.userOrder = await this.getParticipantInfo(order)
      this.order = order
    })
  }

  private async getVariables(): Promise<OrderDetails.Variables> {
    const club: string = await this.storage.get('club')

    return {
      clubId: club,
      orderId: this.orderId
    }
  }

  private async getParticipantInfo(order: OrderDetails.Order): Promise<OrderDetails.Participants> {
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
