import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { OrderCardComponent } from './order-card.component'

describe('OrderCardComponent', () => {
  let component: OrderCardComponent
  let fixture: ComponentFixture<OrderCardComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderCardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
