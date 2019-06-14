import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {IntakeMomentDetailPage} from './intake-moment-detail.page';

describe('IntakeMoment.DetailPage', () => {
  let component: IntakeMomentDetailPage;
  let fixture: ComponentFixture<IntakeMomentDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntakeMomentDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntakeMomentDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
