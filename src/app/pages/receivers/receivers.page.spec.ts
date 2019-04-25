import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiversPage } from './receivers.page';

describe('ReceiversPage', () => {
  let component: ReceiversPage;
  let fixture: ComponentFixture<ReceiversPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReceiversPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiversPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
