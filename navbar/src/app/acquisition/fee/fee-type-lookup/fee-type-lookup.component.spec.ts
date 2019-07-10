import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeTypeLookupComponent } from './fee-type-lookup.component';

describe('FeeTypeLookupComponent', () => {
  let component: FeeTypeLookupComponent;
  let fixture: ComponentFixture<FeeTypeLookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeeTypeLookupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeeTypeLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
