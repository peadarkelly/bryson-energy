import { IonicModule } from '@ionic/angular'
import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { OrdersPage } from './orders/orders.page'
import { OrderPage } from './order/order.page'
import { JoinOrderPage } from './join-order/join-order.page'
import { OrderSummaryComponent } from './components/order-summary/order-summary.component'
import { OrderStatusComponent } from './components/order-status/order-status.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'orders',
    pathMatch: 'full'
  },
  {
    path: 'orders',
    component: OrdersPage
  },
  {
    path: 'orders/:orderId',
    component: OrderPage
  },
  {
    path: 'orders/:orderId/join',
    component: JoinOrderPage
  }
]

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    OrdersPage,
    OrderPage,
    JoinOrderPage,
    OrderSummaryComponent,
    OrderStatusComponent
  ]
})
export class OrdersPageModule {}
