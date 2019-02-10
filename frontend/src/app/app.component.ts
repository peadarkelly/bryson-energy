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
      // this.getInitialRoute().then(route => {
        // this.navCtrl.navigateRoot(route)
        this.statusBar.styleDefault()
        this.splashScreen.hide()
      // })
    })
  }

  // private async getInitialRoute(): Promise<string> {
  //   const user = await this.storage.get('user')
  //   if (!user) {
  //     return '/login'
  //   }

  //   const club = await this.storage.get('club')
  //   if (!club) {
  //     return '/register/clubs'
  //   }

  //   return '/tabs'
  // }
}
