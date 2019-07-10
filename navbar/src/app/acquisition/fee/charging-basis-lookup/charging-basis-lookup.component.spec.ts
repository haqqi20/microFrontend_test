import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargingBasisLookupComponent } from './charging-basis-lookup.component';

describe('ChargingBasisLookupComponent', () => {
  let component: ChargingBasisLookupComponent;
  let fixture: ComponentFixture<ChargingBasisLookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChargingBasisLookupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargingBasisLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
