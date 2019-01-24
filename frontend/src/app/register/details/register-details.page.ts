import { Component, OnInit } from '@angular/core'
import { NavController } from '@ionic/angular'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { PasswordMatcher } from '../passwordMatcher'
import { Storage } from '@ionic/storage'
import { RegisterDetailsData } from './registerDetailsData'

@Component({
  selector: 'app-register-details',
  templateUrl: './register-details.page.html',
  styleUrls: ['./register-details.page.scss'],
})
export class RegisterDetailsPage implements OnInit {

  detailsForm: FormGroup
  submitted = false

  constructor(private navCtrl: NavController, private storage: Storage) { }

  ngOnInit() {
    this.detailsForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      surname: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl(),
      contact: new FormControl(null, Validators.required)
    }, {
      validators: PasswordMatcher.MatchPassword,
      updateOn: 'blur'
    })

    this.prepopulateFromSession()
  }

  private async prepopulateFromSession(): Promise<void> {
    const details: RegisterDetailsData = await this.storage.get('register.details')

    if (!details) {
      return
    }

    this.detailsForm.setValue({
      firstName: details.firstName,
      surname: details.surname,
      email: details.email,
      password: details.password,
      confirmPassword: details.password,
      contact: details.contact
    })
  }

  async submit(): Promise<void> {
    this.submitted = true

    if (this.detailsForm.invalid) {
      return
    }

    await this.saveToSession()
    this.navCtrl.navigateForward('/register/address')
  }

  private saveToSession(): Promise<void> {
    const details: RegisterDetailsData = {
      firstName: this.detailsForm.get('firstName').value,
      surname: this.detailsForm.get('surname').value,
      email: this.detailsForm.get('email').value,
      password: this.detailsForm.get('password').value,
      contact: this.detailsForm.get('contact').value
    }

    return this.storage.set('register.details', details)
  }

  get f() { return this.detailsForm.controls }
}
