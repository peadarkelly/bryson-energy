import { Component, OnInit } from '@angular/core'
import { NavController, AlertController, LoadingController } from '@ionic/angular'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { GetClubsGQL, GetClubs, AddClubGQL, AddClub } from '../../graphql/generated'
import { Storage } from '@ionic/storage'

@Component({
  selector: 'app-register-clubs',
  templateUrl: './register-clubs.page.html',
  styleUrls: ['./register-clubs.page.scss']
})
export class RegisterClubsPage implements OnInit {

  public clubs: Observable<GetClubs.GetClubs[]>

  public constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private storage: Storage,
    private addClubGQL: AddClubGQL,
    private getClubsGQL: GetClubsGQL) { }

  public ngOnInit() {
    this.clubs = this.getClubsGQL.fetch().pipe(map(result => result.data.getClubs))
  }

  public viewClub(club: GetClubs.GetClubs): void {
    this.navCtrl.navigateForward(`/register/club/${club.clubId}`)
  }

  public async createClub(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: `Create club`,
      message: 'Are you sure you want to create a club? As a result you will become the admin for this club',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Join',
          handler: () => this.confirmCreateClub()
        }
      ]
    })

    await alert.present()
  }

  private async confirmCreateClub(): Promise<void> {
    const loading = await this.loadingCtrl.create({
      message: 'Creating club...'
    })

    loading.present()

    const user: string = await this.storage.get('user')

    this.addClubGQL.mutate({ adminId: user }).subscribe(({ data }) => {
      this.storage.set('club', data.addClub.clubId)
      loading.dismiss()
      this.showConfirmationAlert()
      this.navCtrl.navigateRoot('/tabs')
    })
  }

  private async showConfirmationAlert(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Club created',
      message: 'Club successfully created',
      buttons: ['OK']
    })

    alert.present()
  }

}
