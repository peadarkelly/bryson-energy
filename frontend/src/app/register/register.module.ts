import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router'

import { IonicModule } from '@ionic/angular'

import { RegisterDetailsPage } from './details/register-details.page'
import { RegisterAddressPage } from './address/register-address.page'
import { RegisterClubsPage } from './clubs/register-clubs.page'
import { RegisterClubPage } from './club/register-club.page'
import { AddressSearchComponent } from './address/components/address-search/address-search.component'
import { AddressSearchService } from './address/components/address-search/address-search.service'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'details',
    pathMatch: 'full'
  },
  {
    path: 'details',
    component: RegisterDetailsPage
  },
  {
    path: 'address',
    component: RegisterAddressPage
  },
  {
    path: 'clubs',
    component: RegisterClubsPage
  },
  {
    path: 'club/:clubId',
    component: RegisterClubPage
  }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    RegisterDetailsPage,
    RegisterAddressPage,
    RegisterClubsPage,
    RegisterClubPage,
    AddressSearchComponent
  ]
})
export class RegisterPageModule {}
