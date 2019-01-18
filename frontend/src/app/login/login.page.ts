import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string
  password: string

  constructor() { }

  ngOnInit() {
  }

  submit(): void {
    console.log(this.email)
    console.log(this.password)
  }

}
