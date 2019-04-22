import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPinPage } from './registerpin.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('RegisterpinPage', () => {
  let component: RegisterPinPage;
  let fixture: ComponentFixture<RegisterPinPage>;

  beforeEach(async(() => {
	TestBed.configureTestingModule({
		declarations: [ RegisterPinPage ],
		imports: [ HttpClientTestingModule, RouterTestingModule ],
		schemas: [CUSTOM_ELEMENTS_SCHEMA],
	})
	.compileComponents();
  }));

  beforeEach(() => {
	fixture = TestBed.createComponent(RegisterPinPage);
	component = fixture.componentInstance;
	fixture.detectChanges();
  });

  it('should create', () => {
	expect(component).toBeTruthy();
  });
});
