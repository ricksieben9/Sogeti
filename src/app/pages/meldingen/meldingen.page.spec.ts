import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeldingenPage } from './meldingen.page';

describe('MeldingenPage', () => {
  let component: MeldingenPage;
  let fixture: ComponentFixture<MeldingenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MeldingenPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeldingenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
