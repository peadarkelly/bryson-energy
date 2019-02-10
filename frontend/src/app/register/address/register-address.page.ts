import { Component } from '@angular/core'
import { NavController, AlertController, LoadingController } from '@ionic/angular'
import { Storage } from '@ionic/storage'
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase'
import RegisterDetailsData from '../details/registerDetailsData'
import { AddUserGQL, AddUser } from '../../graphql/generated'

@Component({
  selector: 'app-register-address',
  templateUrl: './register-address.page.html',
  styleUrls: ['./register-address.page.scss']
})
export class RegisterAddressPage {

  private static EMAIL_EXISTS_ERROR = 'auth/email-already-in-use'

  public selectedPlaceId: string

  public constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private storage: Storage,
    private authService: AngularFireAuth,
    private alertCtrl: AlertController,
    private addUserGQL: AddUserGQL) { }

  public onAddressSelected(placeId: string): void {
    this.selectedPlaceId = placeId
  }

  public async createAccount(): Promise<void> {
    const loading = await this.loadingCtrl.create({
      message: 'Registering...'
    })

    await loading.present()

    try {
      (await this.createUser()).subscribe(async ({ data }) => {
        await this.storage.set('user', data.addUser.userId)

        loading.dismiss()

        this.showAlert('Registration successful!', 'Your account has been created successfully.')

        this.navCtrl.navigateRoot('/register/clubs')
      })
    } catch (err) {
      loading.dismiss()
      this.handleError(err)
    }
  }

  private async createUser() {
    const details: RegisterDetailsData = await this.storage.get('register.details')

    const response: auth.UserCredential = await this.authService.auth.createUserWithEmailAndPassword(details.email, details.password)

    return this.addUserGQL.mutate(this.getVariables(response.user.uid, details))
  }

  private getVariables(userId: string, details: RegisterDetailsData): AddUser.Variables {
    return {
      input: {
        userId: userId,
        firstName: details.firstName,
        surname: details.surname,
        email: details.email,
        contact: details.contact,
        placeId: this.selectedPlaceId
      }
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
}
