import { Component } from '@angular/core'

import { Platform, NavController } from '@ionic/angular'
import { SplashScreen } from '@ionic-native/splash-screen/ngx'
import { StatusBar } from '@ionic-native/status-bar/ngx'
import { Storage } from '@ionic/storage'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private navCtrl: NavController
  ) {
    this.initializeApp()
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.storage.get('user').then(user => {
        if (!user) {
          this.navCtrl.navigateRoot('/login')
        } else if (!user.clubId) {
          this.navCtrl.navigateRoot('/register/clubs')
        }
      })
      this.statusBar.styleDefault()
      this.splashScreen.hide()
    })
  }
}
