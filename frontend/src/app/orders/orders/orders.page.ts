import { Component, OnInit } from '@angular/core'
import { NavController } from '@ionic/angular'
import { GetOrderSummaryGQL, GetOrderSummary } from '../../graphql/generated'
import { ApolloQueryResult } from 'apollo-client'
import { Storage } from '@ionic/storage'

@Component({
  selector: 'app-orders',
  templateUrl: 'orders.page.html',
  styleUrls: ['orders.page.scss']
})
export class OrdersPage implements OnInit {

  public inProgressOrders: GetOrderSummary.Orders[] = []
  public completedOrders: GetOrderSummary.Orders[] = []
  public loading = false
  public selectedSegment = 'open'

  public constructor(
    private navCtrl: NavController,
    private storage: Storage,
    private getOrderSummaryGQL: GetOrderSummaryGQL
  ) {}

  public ngOnInit() {
    this.fetchOrders()
  }

  private async fetchOrders(): Promise<void> {
    this.loading = true

    this.storage.get('user').then(user => {
      this.getOrderSummaryGQL.fetch({ userId: user }).subscribe(({ data }: ApolloQueryResult<GetOrderSummary.Query>) => {
        if (data.getUser.club.orders.length > 0) {
          this.inProgressOrders = data.getUser.club.orders
          this.completedOrders = data.getUser.club.orders
        }

        this.loading = false
      })
    })
  }

  public onViewOrder(order: GetOrderSummary.Orders): void {
    this.navCtrl.navigateForward(`orders/${order.orderId}`)
  }
}
