import { TestBed } from '@angular/core/testing';

import { IntakeMomentService } from './intake-moment.service';

describe('IntakeMomentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IntakeMomentService = TestBed.get(IntakeMomentService);
    expect(service).toBeTruthy();
  });
});
