import { TestBed } from '@angular/core/testing';

import { RouteGuardService } from './route-guard.service';
import {describe, expect} from '@angular/core/testing/src/testing_internal';

describe('RouteGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RouteGuardService = TestBed.get(RouteGuardService);
    expect(service).toBeTruthy();
  });
});
