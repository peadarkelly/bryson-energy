import { Component, OnInit } from '@angular/core'
import { NavController } from '@ionic/angular'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { GetClubsGQL, GetClubs } from '../../graphql/generated'

@Component({
  selector: 'app-register-clubs',
  templateUrl: './register-clubs.page.html',
  styleUrls: ['./register-clubs.page.scss']
})
export class RegisterClubsPage implements OnInit {

  public clubs: Observable<GetClubs.GetClubs[]>

  public constructor(private navCtrl: NavController, private getClubsGQL: GetClubsGQL) { }

  public ngOnInit() {
    this.clubs = this.getClubsGQL.fetch().pipe(map(result => result.data.getClubs))
  }

  public viewClub(club: GetClubs.GetClubs): void {
    this.navCtrl.navigateForward(`/register/club/${club.clubId}`)
  }

}
