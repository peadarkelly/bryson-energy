import { Component, OnInit } from '@angular/core'
import { NavController } from '@ionic/angular'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase'
import { Storage } from '@ionic/storage'
import { ApolloQueryResult } from 'apollo-client'
import { GetUserSessionGQL, GetUserSession } from '../graphql/generated'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {

  private static CREDENTIALS_ERROR_CODE = 'auth/user-not-found'

  public submitted = false
  public loginForm: FormGroup
  public loginError: string

  public constructor(
    private navCtrl: NavController,
    private authService: AngularFireAuth,
    private storage: Storage,
    private getUserSessionGQL: GetUserSessionGQL) { }

  public ngOnInit() {
    this.clearSession()

    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    }, {
      updateOn: 'blur'
    })
  }

  public async submit(): Promise<void> {
    this.submitted = true
    this.loginError = ''

    if (this.loginForm.invalid) {
      return
    }

    const email: string = this.loginForm.get('email').value
    const password: string = this.loginForm.get('password').value

    try {
      const response: auth.UserCredential = await this.authService.auth.signInWithEmailAndPassword(email, password)
      this.getUserSessionGQL.fetch({ userId: response.user.uid }).subscribe(async ({ data }: ApolloQueryResult<GetUserSession.Query>) => {
        await this.storage.set('user', data.getUser.userId)

        if (data.getUser.clubId) {
          await this.storage.set('club', data.getUser.clubId)
          this.navCtrl.navigateForward('/tabs')
        } else {
          this.navCtrl.navigateForward('/register/clubs')
        }
      })
    } catch (err) {
      this.handleError(err)
    }
  }

  private clearSession(): void {
    this.storage.remove('user')
    this.storage.remove('register.details')
    this.storage.remove('register.address')
  }

  private handleError(err): void {
    console.error(err)
    this.loginError = (err.code === LoginPage.CREDENTIALS_ERROR_CODE) ? 'Incorrect email address or password' : 'Something went wrong'
  }

  get f() { return this.loginForm.controls }
}
