import { Component, OnInit } from '@angular/core'
import { NavController } from '@ionic/angular'
import { ClubSummary } from '../../models'

@Component({
  selector: 'app-register-clubs',
  templateUrl: './register-clubs.page.html',
  styleUrls: ['./register-clubs.page.scss'],
})
export class RegisterClubsPage implements OnInit {

  clubs: ClubSummary[] = []

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    this.clubs = [
      {
        clubId: 123,
        admin: 'Joe Bloggs',
        numberOfMembers: 2
      },
      {
        clubId: 456,
        admin: 'Mary Todd',
        numberOfMembers: 3
      },
      {
        clubId: 789,
        admin: 'Raymond Gormley',
        numberOfMembers: 7
      }
    ]
  }

  viewClub(club: ClubSummary): void {
    this.navCtrl.navigateForward(`/register/club/${club.clubId}`)
  }

}
