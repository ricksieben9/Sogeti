import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ReceiversIntakeMomentsPage} from './receivers-intake-moments.page';

describe('ReceiversIntakeMomentsPage', () => {
  let component: ReceiversIntakeMomentsPage;
  let fixture: ComponentFixture<ReceiversIntakeMomentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiversIntakeMomentsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiversIntakeMomentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
