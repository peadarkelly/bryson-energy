import { Component, OnInit } from '@angular/core'
import { NavController } from '@ionic/angular'
import { Club } from '../../models'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-register-club',
  templateUrl: './register-club.page.html',
  styleUrls: ['./register-club.page.scss'],
})
export class RegisterClubPage implements OnInit {

  club: Club

  constructor(private route: ActivatedRoute, private navCtrl: NavController) { }

  ngOnInit() {
    this.club = {
      clubId: Number(this.route.snapshot.paramMap.get('clubId')),
      admin: 'Raymond Gormley',
      numberOfMembers: 7,
      createdDate: new Date(2018, 11, 1),
      lastOrderDate: new Date(2019, 1, 1),
      members: [
        { name: 'Peadar Kelly' },
        { name: 'Paul Ward' },
        { name: 'Gerry Joe' },
        { name: 'Bill Clinto' },
        { name: 'Lady Gaga' },
        { name: 'Andy Murray' },
        { name: 'Paul Blart' }
      ]
    }
  }

  joinClub(): void {
    this.navCtrl.navigateRoot('/tabs')
  }
}
