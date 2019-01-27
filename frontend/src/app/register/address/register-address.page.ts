import { Component, OnInit } from '@angular/core'
import { NavController, AlertController } from '@ionic/angular'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Storage } from '@ionic/storage'
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase'
import RegisterAddressData from './registerAddressData'
import RegisterDetailsData from '../details/registerDetailsData'
import { AddUserGQL, AddUser } from '../../graphql/generated'

@Component({
  selector: 'app-register-address',
  templateUrl: './register-address.page.html',
  styleUrls: ['./register-address.page.scss']
})
export class RegisterAddressPage implements OnInit {

  private static EMAIL_EXISTS_ERROR = 'auth/email-already-in-use'

  public addressForm: FormGroup
  public submitted = false

  public constructor(
    private navCtrl: NavController,
    private storage: Storage,
    private authService: AngularFireAuth,
    private alertCtrl: AlertController,
    private addUserGQL: AddUserGQL) { }

  public ngOnInit() {
    this.addressForm = new FormGroup({
      houseNumber: new FormControl(null, Validators.required),
      address1: new FormControl(null, Validators.required),
      address2: new FormControl(null),
      city: new FormControl(null, Validators.required),
      postcode: new FormControl(null, Validators.required)
    }, {
      updateOn: 'blur'
    })

    this.prepopulateFromSession()
  }

  private async prepopulateFromSession(): Promise<void> {
    const address: RegisterAddressData = await this.storage.get('register.address')

    if (!address) {
      return
    }

    this.addressForm.setValue({
      houseNumber: address.houseNumber,
      address1: address.addressLine1,
      address2: address.addressLine2,
      city: address.city,
      postcode: address.postcode
    })
  }

  public async createAccount(): Promise<void> {
    this.submitted = true

    if (this.addressForm.invalid) {
      return
    }

    await this.saveToSession()

    try {
      (await this.createUser()).subscribe(async ({ data }) => {
        await this.storage.set('user', data.addUser.userId)
        await this.storage.remove('register.details')
        await this.storage.remove('register.address')

        this.showAlert('Registration successful!', 'Your account has been created successfully.')

        this.navCtrl.navigateRoot('/register/clubs')
      })
    } catch (err) {
      this.handleError(err)
    }
  }

  private saveToSession(): Promise<void> {
    const address: RegisterAddressData = {
      houseNumber: this.addressForm.get('houseNumber').value,
      addressLine1: this.addressForm.get('address1').value,
      addressLine2: this.addressForm.get('address2').value,
      city: this.addressForm.get('city').value,
      postcode: this.addressForm.get('postcode').value
    }

    return this.storage.set('register.address', address)
  }

  private async createUser() {
    const details: RegisterDetailsData = await this.storage.get('register.details')
    const address: RegisterAddressData = await this.storage.get('register.address')

    const response: auth.UserCredential = await this.authService.auth.createUserWithEmailAndPassword(details.email, details.password)

    return this.addUserGQL.mutate(this.getVariables(response.user.uid, details, address))
  }

  private getVariables(userId: string, details: RegisterDetailsData, address: RegisterAddressData): AddUser.Variables {
    return {
      userId: userId,
      firstName: details.firstName,
      surname: details.surname,
      email: details.email,
      contact: details.contact,
      houseNumber: address.houseNumber,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2,
      city: address.city,
      postcode: address.postcode
    }
  }

  private async handleError(err): Promise<void> {
    console.error(err)

    if (err.code === RegisterAddressPage.EMAIL_EXISTS_ERROR) {
      this.showAlert('Email already exists', 'The email address is already in use by another account.')
      this.navCtrl.navigateBack('/register/details')
    } else {
      this.showAlert('Something went wrong', 'Please try again')
    }
  }

  private async showAlert(heading: string, message: string): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: heading,
      message: message,
      buttons: ['OK']
    })

    alert.present()
  }

  get f() { return this.addressForm.controls }
}
