import { Component, OnInit } from '@angular/core'
import { NavController, AlertController, LoadingController } from '@ionic/angular'
import { OrderSummaryGQL, OrderSummary, AddOrderGQL, AddOrder, OrderStatus } from '../../graphql/generated'
import { NotficationsService } from '../../notifications/notifications.service'
import { ApolloQueryResult } from 'apollo-client'
import { Storage } from '@ionic/storage'
import * as moment from 'moment'

@Component({
  selector: 'app-orders',
  templateUrl: 'orders.page.html',
  styleUrls: ['orders.page.scss']
})
export class OrdersPage implements OnInit {

  public inProgressOrders: OrderSummary.Orders[] = []
  public completedOrders: OrderSummary.Orders[] = []

  public loading = false
  public isAdmin = false

  public selectedSegment = 'open'

  public constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private storage: Storage,
    private notificationsService: NotficationsService,
    private getOrderSummaryGQL: OrderSummaryGQL,
    private addOrderGQL: AddOrderGQL
  ) {}

  public ngOnInit(): void {
    this.storage.get('isAdmin').then(isAdmin => this.isAdmin = isAdmin)
    this.fetchOrders()
    this.notificationsService.getToken()
  }

  public ionViewDidEnter(): void {
    this.fetchOrders()
  }

  public refresh(event): void {
    this.fetchOrders().then(() => event.target.complete())
  }

  private async fetchOrders(): Promise<void> {
    this.loading = true

    const user: string = await this.storage.get('user')

    this.getOrderSummaryGQL.fetch({ userId: user }).subscribe(({ data }: ApolloQueryResult<OrderSummary.Query>) => {
      if (data.user.club.orders.length > 0) {
        this.inProgressOrders = this.getFilteredOrders(data, OrderStatus.Open, OrderStatus.DeliveryDue)
        this.completedOrders = this.getFilteredOrders(data, OrderStatus.Completed)
      }

      this.loading = false
    })
  }

  private getFilteredOrders(data: OrderSummary.Query, ...status: OrderStatus[]): OrderSummary.Orders[] {
    return data.user.club.orders.filter(order => status.includes(order.status))
  }

  public onViewOrder(order: OrderSummary.Orders): void {
    this.navCtrl.navigateForward(`orders/${order.orderId}`)
  }

  public async initiateOrder(): Promise<void> {
    const deadlineDate: Date = this.calculateDeadlineDate()
    const deliveryDate: Date = this.calculateDeliveryDate()
    const formattedDeadlineDate: string = moment(deadlineDate).format('dddd, MMMM Do, YYYY')
    const formattedDeliveryDate: string = moment(deliveryDate).format('dddd, MMMM Do, YYYY')

    const alert = await this.alertCtrl.create({
      header: `Initiate order`,
      message: `
        <p>Are you sure you want to initiate an order?</p>
        <p>The order deadline date will be <strong>${formattedDeadlineDate}</strong></p>
        <p>The order delivery date will be <strong>${formattedDeliveryDate}</strong></p>
      `,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Confirm',
          cssClass: 'initiate-order-confirm',
          handler: () => this.confirmInitiateOrder(deadlineDate, deliveryDate)
        }
      ]
    })

    alert.present()
  }

  private calculateDeadlineDate(): Date {
    return moment().add(3, 'days').hours(18).minutes(30).toDate()
  }

  private calculateDeliveryDate(): Date {
    return moment().add(6, 'days').hours(14).minutes(30).toDate()
  }

  private async confirmInitiateOrder(deadlineDate: Date, deliveryDate: Date): Promise<void> {
    const loading = await this.loadingCtrl.create({
      message: 'Initiating order...'
    })

    loading.present()

    this.addOrderGQL
      .mutate(await this.getVariables(deadlineDate, deliveryDate))
      .subscribe(({ data }) => {
        loading.dismiss()

        this.showConfirmationAlert()

        this.navCtrl.navigateRoot(`/orders/${data.addOrder.orderId}`)
      })
  }

  private async getVariables(deadlineDate: Date, deliveryDate: Date): Promise<AddOrder.Variables> {
    const club: string = await this.storage.get('club')

    return {
      input: {
        clubId: club,
        deadlineDate: deadlineDate.toISOString(),
        deliveryDate: deliveryDate.toISOString()
      }
    }
  }

  private async showConfirmationAlert(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Order initiated',
      message: 'Order successfully initiated',
      buttons: [{
        text: 'OK',
        cssClass: 'initiate-order-ok'
      }]
    })

    alert.present()
  }
}
