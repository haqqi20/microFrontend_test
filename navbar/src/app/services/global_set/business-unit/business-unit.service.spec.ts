import { TestBed } from '@angular/core/testing';

import { BusinessUnitService } from './business-unit.service';

describe('BusinessUnitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusinessUnitService = TestBed.get(BusinessUnitService);
    expect(service).toBeTruthy();
  });
});
