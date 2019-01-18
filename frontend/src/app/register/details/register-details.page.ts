import { Component, OnInit } from '@angular/core'
import { NavController } from '@ionic/angular'
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-register-details',
  templateUrl: './register-details.page.html',
  styleUrls: ['./register-details.page.scss'],
})
export class RegisterDetailsPage implements OnInit {

  detailsForm: FormGroup
  submitted = false

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    this.detailsForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      contact: new FormControl('', Validators.required),
    })
  }

  submit(): void {
    this.submitted = true

    if (this.detailsForm.invalid) {
      return
    }

    this.navCtrl.navigateForward('/register/address')
  }

}
