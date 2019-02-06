import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { OrderStatusComponent } from './order-status.component'

describe('OrderStatusComponent', () => {
  let component: OrderStatusComponent
  let fixture: ComponentFixture<OrderStatusComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderStatusComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderStatusComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
