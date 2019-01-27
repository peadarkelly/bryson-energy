import { Component, OnInit } from '@angular/core'
import { NavController } from '@ionic/angular'
import { ActivatedRoute } from '@angular/router'
import { Storage } from '@ionic/storage'
import { ApolloQueryResult } from 'apollo-client'
import { GetClubGQL, GetClub, JoinClubGQL, JoinClub } from '../../graphql/generated'

@Component({
  selector: 'app-register-club',
  templateUrl: './register-club.page.html',
  styleUrls: ['./register-club.page.scss']
})
export class RegisterClubPage implements OnInit {

  public club: GetClub.GetClubs

  private clubId: string

  public constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private storage: Storage,
    private getClubGQL: GetClubGQL,
    private joinClubGQL: JoinClubGQL) { }

  public ngOnInit() {
    this.clubId = this.route.snapshot.paramMap.get('clubId')
    this.getClubGQL.fetch({ clubId: this.clubId }).subscribe(({ data }: ApolloQueryResult<GetClub.Query>) => {
      this.club = data.getClubs[0]
    })
  }

  public async joinClub(): Promise<void> {
    this.joinClubGQL.mutate(await this.getVariables()).subscribe(({ data }) => {
      this.storage.set('club', data.joinClub.clubId)
      this.navCtrl.navigateRoot('/tabs')
    })
  }

  private async getVariables(): Promise<JoinClub.Variables> {
    return {
      clubId: this.clubId,
      userId: await this.storage.get('user')
    }
  }
}
