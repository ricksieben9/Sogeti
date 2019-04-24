import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OntvangersPage } from './ontvangers.page';

describe('OntvangersPage', () => {
  let component: OntvangersPage;
  let fixture: ComponentFixture<OntvangersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OntvangersPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OntvangersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
