import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfielPage } from './profiel.page';

describe('ProfielPage', () => {
  let component: ProfielPage;
  let fixture: ComponentFixture<ProfielPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfielPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfielPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
