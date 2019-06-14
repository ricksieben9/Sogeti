import {TestBed} from '@angular/core/testing';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {LoginGuard} from './login.guard';

describe('LoginGuard', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpClient,
      HttpHandler,
      RouterTestingModule,
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const guard: LoginGuard = TestBed.get(LoginGuard);
    expect(guard).toBeTruthy();
  });
});