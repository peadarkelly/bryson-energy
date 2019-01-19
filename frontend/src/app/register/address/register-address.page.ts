import { Component, OnInit } from '@angular/core'
import { NavController } from '@ionic/angular'
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-register-address',
  templateUrl: './register-address.page.html',
  styleUrls: ['./register-address.page.scss'],
})
export class RegisterAddressPage implements OnInit {

  addressForm: FormGroup
  submitted = false

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    this.addressForm = new FormGroup({
      houseNumber: new FormControl(null, Validators.required),
      address1: new FormControl(null, Validators.required),
      address2: new FormControl(),
      city: new FormControl(null, Validators.required),
      postcode: new FormControl(null, Validators.required)
    }, {
      updateOn: 'blur'
    })
  }

  submit(): void {
    this.submitted = true

    if (this.addressForm.invalid) {
      console.log(this.addressForm)
      return
    }

    this.navCtrl.navigateForward('/register/club')
  }

  get f() { return this.addressForm.controls }
}
