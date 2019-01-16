import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAddressPage } from './register-address.page';

describe('RegisterAddressPage', () => {
  let component: RegisterAddressPage;
  let fixture: ComponentFixture<RegisterAddressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterAddressPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterAddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
