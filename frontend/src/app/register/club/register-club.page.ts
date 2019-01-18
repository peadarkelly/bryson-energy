import { Component, OnInit } from '@angular/core'
import { NavController } from '@ionic/angular'

@Component({
  selector: 'app-register-club',
  templateUrl: './register-club.page.html',
  styleUrls: ['./register-club.page.scss'],
})
export class RegisterClubPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  submit(): void {
    this.navCtrl.navigateRoot('/tabs')
  }

}
