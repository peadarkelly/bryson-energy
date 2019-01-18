import { Component, OnInit } from '@angular/core'
import { NavController } from '@ionic/angular'

@Component({
  selector: 'app-register-address',
  templateUrl: './register-address.page.html',
  styleUrls: ['./register-address.page.scss'],
})
export class RegisterAddressPage implements OnInit {

  houseNumber: number
  address1: string
  address2: string
  city: string
  postcode: string

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  submit(): void {
    console.log(this.houseNumber)
    console.log(this.address1)
    console.log(this.address2)
    console.log(this.city)
    console.log(this.postcode)
    this.navCtrl.navigateForward('/register/club')
  }

}
