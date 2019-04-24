import { TestBed } from '@angular/core/testing';

import { ConnectioncheckService } from './connectioncheck.service';

describe('ConnectioncheckService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConnectioncheckService = TestBed.get(ConnectioncheckService);
    expect(service).toBeTruthy();
  });
});
