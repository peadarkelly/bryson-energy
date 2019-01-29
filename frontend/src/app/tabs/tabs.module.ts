import { IonicModule } from '@ionic/angular'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { TabsPageRoutingModule } from './tabs.router.module'

import { TabsPage } from './tabs.page'
import { AccountPageModule } from '../account/account.module'
import { HomePageModule } from '../home/home.module'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    HomePageModule,
    AccountPageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
