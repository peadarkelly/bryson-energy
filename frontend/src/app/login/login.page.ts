import { Component, OnInit } from '@angular/core'
import { NavController } from '@ionic/angular'
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  submitted = false
  loginForm: FormGroup

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    }, {
      updateOn: 'blur'
    })
  }

  submit(): void {
    this.submitted = true

    if (this.loginForm.invalid) {
      return
    }

    this.navCtrl.navigateForward('/tabs')
  }

  get f() { return this.loginForm.controls }
}
