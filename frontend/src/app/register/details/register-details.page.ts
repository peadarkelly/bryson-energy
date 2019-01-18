import { Component, OnInit } from '@angular/core'
import { NavController } from '@ionic/angular'

@Component({
  selector: 'app-register-details',
  templateUrl: './register-details.page.html',
  styleUrls: ['./register-details.page.scss'],
})
export class RegisterDetailsPage implements OnInit {

  firstName: string
  surname: string
  email: string
  password: string
  confirmPassword: string
  contact: string

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  submit(): void {
    console.log(this.firstName)
    console.log(this.surname)
    console.log(this.email)
    console.log(this.password)
    console.log(this.confirmPassword)
    console.log(this.contact)
    this.navCtrl.navigateForward('/register/address')
  }

}
