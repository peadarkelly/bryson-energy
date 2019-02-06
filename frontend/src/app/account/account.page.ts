import { Component, OnInit } from '@angular/core'
import { UserAccountGQL, UserAccount } from '../graphql/generated'
import { ApolloQueryResult } from 'apollo-client'
import { Storage } from '@ionic/storage'
import { NavController, AlertController } from '@ionic/angular'
import { AngularFireAuth } from '@angular/fire/auth'

@Component({
  selector: 'app-account',
  templateUrl: 'account.page.html',
  styleUrls: ['account.page.scss']
})
export class AccountPage implements OnInit {

  public account: UserAccount.User

  public constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private authService: AngularFireAuth,
    private storage: Storage,
    private userAccountGQL: UserAccountGQL) {}

  public ngOnInit() {
    this.storage.get('user').then(user => {
      this.userAccountGQL.fetch({ userId: user }).subscribe(({ data }: ApolloQueryResult<UserAccount.Query>) => {
        this.account = data.user
      })
    })
  }

  public async signOut(): Promise<void> {
    await this.authService.auth.signOut()
    this.clearSessionAndRedirectToLogin()
  }

  public async deleteAccount(): Promise<void> {
    await this.presentAlertConfirm()
  }

  private async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Are you sure you want to delete your account?',
      message: 'This action cannot be undone.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Delete account',
          cssClass: 'delete-account',
          handler: () => this.confirmDeleteAccount()
        }
      ]
    })

    await alert.present()
  }

  private async confirmDeleteAccount(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Account deleted',
      buttons: ['OK']
    })

    alert.present()

    this.clearSessionAndRedirectToLogin()
  }

  private async clearSessionAndRedirectToLogin(): Promise<void> {
    await this.storage.remove('club')
    await this.storage.remove('user')
    await this.navCtrl.navigateBack('/login')
  }

}
