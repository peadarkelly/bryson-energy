import { Component, OnInit } from '@angular/core'
import { NavController, AlertController, LoadingController } from '@ionic/angular'
import { ClubsGQL, Clubs, AddClubGQL } from '../../graphql/generated'
import { Storage } from '@ionic/storage'
import { ApolloQueryResult } from 'apollo-client'

@Component({
  selector: 'app-register-clubs',
  templateUrl: './register-clubs.page.html',
  styleUrls: ['./register-clubs.page.scss']
})
export class RegisterClubsPage implements OnInit {

  public clubs: Clubs.Clubs[] = []

  public constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private storage: Storage,
    private addClubGQL: AddClubGQL,
    private clubsGQL: ClubsGQL) { }

  public ngOnInit() {
    this.fetchClubs()
  }

  private async fetchClubs(): Promise<void> {
    const user: string = await this.storage.get('user')
    this.clubsGQL.fetch({ userId: user }).subscribe(({ data }: ApolloQueryResult<Clubs.Query>) => {
      this.clubs = data.clubs
    })
  }

  public viewClub(club: Clubs.Clubs): void {
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
          text: 'Create',
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
      this.storage.set('isAdmin', true)

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
