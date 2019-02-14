import { Component, OnInit } from '@angular/core'
import { NavController, LoadingController, AlertController } from '@ionic/angular'
import { ActivatedRoute } from '@angular/router'
import { Storage } from '@ionic/storage'
import { ApolloQueryResult } from 'apollo-client'
import { ClubGQL, Club, JoinClubGQL, JoinClub } from '../../graphql/generated'

@Component({
  selector: 'app-register-club',
  templateUrl: './register-club.page.html',
  styleUrls: ['./register-club.page.scss']
})
export class RegisterClubPage implements OnInit {

  public club: Club.Club

  private clubId: string

  public constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private storage: Storage,
    private clubGQL: ClubGQL,
    private joinClubGQL: JoinClubGQL) { }

  public ngOnInit() {
    this.clubId = this.route.snapshot.paramMap.get('clubId')
    this.fetchClub()
  }

  private fetchClub(): void {
    this.clubGQL.fetch({ clubId: this.clubId }).subscribe(({ data }: ApolloQueryResult<Club.Query>) => {
      this.club = data.club
    })
  }

  public async joinClub(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: `${this.club.admin}'s club`,
      message: 'Are you sure you want to join this club?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Join',
          handler: () => this.confirmJoinClub()
        }
      ]
    })

    await alert.present()
  }

  private async confirmJoinClub(): Promise<void> {
    const loading = await this.loadingCtrl.create({
      message: 'Joining club...'
    })

    loading.present()

    this.joinClubGQL.mutate(await this.getVariables()).subscribe(({ data }) => {
      this.storage.set('club', data.joinClub.club.clubId)
      this.storage.set('isAdmin', false)

      loading.dismiss()

      this.showConfirmationAlert()
      this.navCtrl.navigateRoot('/tabs')
    })
  }

  private async getVariables(): Promise<JoinClub.Variables> {
    return {
      clubId: this.clubId,
      userId: await this.storage.get('user')
    }
  }

  private async showConfirmationAlert(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Club joined',
      message: 'You have successfully joined the selected club',
      buttons: ['OK']
    })

    alert.present()
  }
}
