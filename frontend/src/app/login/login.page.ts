import { Component, OnInit } from '@angular/core'
import { NavController, LoadingController, AlertController } from '@ionic/angular'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AngularFireAuth } from '@angular/fire/auth'
import { auth, User } from 'firebase'
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
    private firebaseAuth: AngularFireAuth,
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

    try {
      const userId: string = await this.authenticate()
      const user: UserSession.User = await this.getUserInfo(userId)

      await this.saveUserInfoToSession(user)

      this.navCtrl.navigateForward(this.hasClub(user) ? '/tabs' : '/register/clubs')

      loading.dismiss()
    } catch (err) {
      this.handleError(err)
      loading.dismiss()
    }
  }

  private async authenticate(): Promise<string> {
    const email: string = this.loginForm.get('email').value
    const password: string = this.loginForm.get('password').value

    const response: auth.UserCredential = await this.firebaseAuth.auth.signInWithEmailAndPassword(email, password)

    return response.user.uid
  }

  private getUserInfo(userId: string): Promise<UserSession.User> {
    return new Promise<UserSession.User>(resolve => {
      this.userSessionGQL.fetch({ userId: userId }).subscribe(async ({ data }: ApolloQueryResult<UserSession.Query>) => {
        resolve(data.user)
      })
    })
  }

  private async saveUserInfoToSession(user: UserSession.User): Promise<void> {
    await this.storage.set('user', user.userId)

    if (this.hasClub(user)) {
      await this.storage.set('club', user.club.clubId)
      await this.storage.set('isAdmin', this.isClubAdmin(user))
    }
  }

  private hasClub(user: UserSession.User): boolean {
    return !!user.club.clubId
  }

  private isClubAdmin(userSession: UserSession.User): boolean {
    return userSession.club.members.filter(member => member.isAdmin).map(admin => admin.userId).includes(userSession.userId)
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
