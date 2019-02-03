import { Component, OnInit } from '@angular/core'
import { NavController, AlertController, LoadingController } from '@ionic/angular'
import { GetOrderSummaryGQL, GetOrderSummary, AddOrderGQL, AddOrder } from '../../graphql/generated'
import { ApolloQueryResult } from 'apollo-client'
import { Storage } from '@ionic/storage'
import * as moment from 'moment'

@Component({
  selector: 'app-orders',
  templateUrl: 'orders.page.html',
  styleUrls: ['orders.page.scss']
})
export class OrdersPage implements OnInit {

  public inProgressOrders: GetOrderSummary.Orders[] = []
  public completedOrders: GetOrderSummary.Orders[] = []

  public loading = false
  public isAdmin = false

  public selectedSegment = 'open'

  public constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private storage: Storage,
    private getOrderSummaryGQL: GetOrderSummaryGQL,
    private addOrderGQL: AddOrderGQL
  ) {}

  public ngOnInit() {
    this.storage.get('isAdmin').then(isAdmin => this.isAdmin = isAdmin)
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

  public async initiateOrder(): Promise<void> {
    const deadlineDate: Date = this.calculateDeadlineDate()
    const formattedDeadlineDate: string = moment(deadlineDate).format('dddd, MMMM Do, YYYY')

    const alert = await this.alertCtrl.create({
      header: `Initiate order`,
      message: `
        <p>Are you sure you want to initiate an order?</p>
        <p>The order deadline date will be <strong>${formattedDeadlineDate}</strong></p>
      `,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Confirm',
          handler: () => this.confirmInitiateOrder(deadlineDate)
        }
      ]
    })

    alert.present()
  }

  private calculateDeadlineDate(): Date {
    return moment().add(3, 'days').hours(18).minutes(30).toDate()
  }

  private async confirmInitiateOrder(deadlineDate: Date): Promise<void> {
    const loading = await this.loadingCtrl.create({
      message: 'Initiating order...'
    })

    loading.present()

    const club: string = await this.storage.get('club')

    this.addOrderGQL
      .mutate({
        clubId: club,
        deadlineDate: deadlineDate.toISOString()
      })
      .subscribe(({ data }) => {
        loading.dismiss()

        this.showConfirmationAlert()

        this.navCtrl.navigateRoot(`/orders/${data.addOrder.orderId}`)
      })
  }

  private async showConfirmationAlert(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Order initiated',
      message: 'Order successfully initiated',
      buttons: ['OK']
    })

    alert.present()
  }
}