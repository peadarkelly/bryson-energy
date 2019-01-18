import { Component, OnInit } from '@angular/core'
import { NavController } from '@ionic/angular'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { PasswordMatcher } from '../passwordMatcher'

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
      firstName: new FormControl(null, Validators.required),
      surname: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl(),
      contact: new FormControl(null, Validators.required),
    }, {
      validators: PasswordMatcher.MatchPassword,
      updateOn: 'blur' }
    )
  }

  submit(): void {
    this.submitted = true

    if (this.detailsForm.invalid) {
      return
    }

    this.navCtrl.navigateForward('/register/address')
  }

  get f() { return this.detailsForm.controls }
}
