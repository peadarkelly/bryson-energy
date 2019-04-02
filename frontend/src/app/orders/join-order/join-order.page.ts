import { Component, OnInit } from '@angular/core'
import { NavController, AlertController, LoadingController } from '@ionic/angular'
import { JoinOrderGQL, JoinOrder } from '../../graphql/generated'
import { Storage } from '@ionic/storage'
import { ActivatedRoute } from '@angular/router'
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-join-order',
  templateUrl: 'join-order.page.html',
  styleUrls: ['join-order.page.scss']
})
export class JoinOrderPage implements OnInit {

  public orderForm: FormGroup
  public submitted = false

  private orderId: string

  public constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private storage: Storage,
    private joinOrderGQL: JoinOrderGQL
  ) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('orderId')

    this.orderForm = new FormGroup({
      volume: new FormControl(null, [Validators.required, Validators.min(100), Validators.max(500)])
    })
  }

  public calculateCost(): string {
    const volume: number = this.orderForm.get('volume').value

    if (!volume) {
      return '0.00'
    }

    return (volume * 0.55).toFixed(2)
  }

  public async joinOrder(): Promise<void> {
    this.submitted = true

    if (this.orderForm.invalid) {
      return
    }

    const volume: number = this.orderForm.get('volume').value
    const cost: string = this.calculateCost()

    const alert = await this.alertCtrl.create({
      header: `Join order`,
      message: `
        <p>Are you sure you want to join this order?</p>
        <p>The total cost for ${volume} litres of oil will be £${cost}</p>
      `,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Confirm',
          cssClass: 'join-order-confirm',
          handler: () => this.confirmJoinOrder(volume, Number(cost))
        }
      ]
    })

    alert.present()
  }

  private async confirmJoinOrder(volume: number, cost: number): Promise<void> {
    const loading = await this.loadingCtrl.create({
      message: 'Joining order...'
    })

    loading.present()

    this.joinOrderGQL
      .mutate(await this.getVariables(volume, cost))
      .subscribe(({ data }) => {
        loading.dismiss()

        this.showConfirmationAlert()

        this.navCtrl.navigateBack(`/orders/${data.joinOrder.orderId}`)
      })
  }

  private async getVariables(volume: number, cost: number): Promise<JoinOrder.Variables> {
    const user: string = await this.storage.get('user')

    return {
      input: {
        userId: user,
        orderId: this.orderId,
        volume: volume,
        cost: cost
      }
    }
  }

  private async showConfirmationAlert(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Order joined',
      message: 'Order successfully joined',
      buttons: [{
        text: 'OK',
        cssClass: 'join-order-ok'
      }]
    })

    alert.present()
  }

  get f() { return this.orderForm.controls }
}
