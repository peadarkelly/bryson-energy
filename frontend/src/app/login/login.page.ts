import { Component, OnInit } from '@angular/core'
import { NavController, LoadingController, AlertController } from '@ionic/angular'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase'
import { Storage } from '@ionic/storage'
import { ApolloQueryResult } from 'apollo-client'
import { UserSessionGQL, UserSession } from '../graphql/generated'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {

  private static CREDENTIALS_ERROR_CODE = 'auth/user-not-found'

  public submitted = false
  public loginForm: FormGroup

  public constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private authService: AngularFireAuth,
    private storage: Storage,
    private userSessionGQL: UserSessionGQL) { }

  public ngOnInit() {
    this.clearSession()

    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    }, {
      updateOn: 'blur'
    })
  }

  private clearSession(): void {
    this.storage.remove('user')
    this.storage.remove('isAdmin')
    this.storage.remove('register.details')
    this.storage.remove('register.address')
  }

  public async submit(): Promise<void> {
    this.submitted = true

    if (this.loginForm.invalid) {
      return
    }

    const loading = await this.loadingCtrl.create({
      message: 'Signing in...'
    })

    await loading.present()

    const email: string = this.loginForm.get('email').value
    const password: string = this.loginForm.get('password').value

    try {
      const response: auth.UserCredential = await this.authService.auth.signInWithEmailAndPassword(email, password)
      this.userSessionGQL.fetch({ userId: response.user.uid }).subscribe(async ({ data }: ApolloQueryResult<UserSession.Query>) => {
        await this.storage.set('user', data.user.userId)

        if (data.user.club.clubId) {
          await this.storage.set('club', data.user.club.clubId)
          await this.storage.set('isAdmin', this.isClubAdmin(data.user))
          this.navCtrl.navigateForward('/tabs')
        } else {
          this.navCtrl.navigateForward('/register/clubs')
        }

        loading.dismiss()
      })
    } catch (err) {
      this.handleError(err)
      loading.dismiss()
    }
  }

  private isClubAdmin(userSession: UserSession.User): boolean {
    return userSession.club.members.filter(member => member.userId === userSession.userId)[0].isAdmin
  }

  private async handleError(err): Promise<void> {
    console.error(err)

    const alert = await this.alertCtrl.create({
      header: this.getErrorHeader(err),
      message: this.getErrorMessage(err),
      buttons: ['OK']
    })

    alert.present()
  }

  private getErrorHeader(err): string {
    return (err.code === LoginPage.CREDENTIALS_ERROR_CODE) ? 'Invalid credentials' : 'Something went wrong'
  }

  private getErrorMessage(err): string {
    return (err.code === LoginPage.CREDENTIALS_ERROR_CODE) ? 'Incorrect email address or password' : 'Please try again'
  }

  get f() { return this.loginForm.controls }
}
