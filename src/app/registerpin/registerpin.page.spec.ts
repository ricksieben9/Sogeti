import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterpinPage } from './registerpin.page';

describe('RegisterpinPage', () => {
  let component: RegisterpinPage;
  let fixture: ComponentFixture<RegisterpinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterpinPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterpinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
