import { Injectable } from '@angular/core'
import { Firebase } from '@ionic-native/firebase/ngx'
import { AngularFireFunctions } from '@angular/fire/functions'
import { Platform } from '@ionic/angular'
import { Storage } from '@ionic/storage'

@Injectable({
  providedIn: 'root'
})
export class NotficationsService {

  public constructor(
    private firebase: Firebase,
    private functions: AngularFireFunctions,
    private storage: Storage,
    private platform: Platform) {}

  public async getToken(): Promise<any> {
    let token: string

    if (this.platform.is('android')) {
      token = await this.firebase.getToken()
    }

    if (this.platform.is('ios')) {
      token = await this.firebase.getToken()
      await this.firebase.grantPermission()
    }

    return this.saveToken(token)
  }

  private async saveToken(token: string): Promise<any> {
    if (!token) {
      return
    }

    return this.functions.httpsCallable('tokens')({
      userId: await this.storage.get('user'),
      token: token
    }).toPromise()
  }
}
