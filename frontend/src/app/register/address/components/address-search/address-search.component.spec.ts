import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { AddressSearchComponent } from './address-search.component'

describe('AddressSearchComponent', () => {
  let component: AddressSearchComponent
  let fixture: ComponentFixture<AddressSearchComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddressSearchComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressSearchComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
