import { Component, OnInit } from '@angular/core'
import { NavController } from '@ionic/angular'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AngularFireAuth } from '@angular/fire/auth'
import { Storage } from '@ionic/storage'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private static CREDENTIALS_ERROR_CODE = 'auth/user-not-found'

  submitted = false
  loginForm: FormGroup
  loginError: string

  constructor(
    private navCtrl: NavController,
    private auth: AngularFireAuth,
    private storage: Storage) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    }, {
      updateOn: 'blur'
    })
  }

  async submit(): Promise<void> {
    this.submitted = true
    this.loginError = ''

    if (this.loginForm.invalid) {
      return
    }

    const email: string = this.loginForm.get('email').value
    const password: string = this.loginForm.get('password').value

    try {
      const response = await this.auth.auth.signInWithEmailAndPassword(email, password)
      await this.storage.set('user', response.user.uid)
      this.navCtrl.navigateForward('/tabs')
    } catch (err) {
      console.error(err)
      this.loginError = (err.code === LoginPage.CREDENTIALS_ERROR_CODE) ? 'Incorrect email address or password' : 'Something went wrong'
    }
  }

  get f() { return this.loginForm.controls }
}
