import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { RegisterClubsPage } from './register-clubs.page'

describe('RegisterClubsPage', () => {
  let component: RegisterClubsPage
  let fixture: ComponentFixture<RegisterClubsPage>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterClubsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterClubsPage)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
