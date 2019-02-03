import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { JoinOrderPage } from './join-order.page'

describe('JoinOrderPage', () => {
  let component: JoinOrderPage
  let fixture: ComponentFixture<JoinOrderPage>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JoinOrderPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinOrderPage)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
