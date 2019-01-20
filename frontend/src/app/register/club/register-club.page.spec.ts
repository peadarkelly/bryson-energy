import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { RegisterClubPage } from './register-club.page'

describe('RegisterClubsPage', () => {
  let component: RegisterClubPage
  let fixture: ComponentFixture<RegisterClubPage>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterClubPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterClubPage)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
