import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessUnitDetailsComponent } from './business-unit-details.component';

describe('BusinessUnitDetailsComponent', () => {
  let component: BusinessUnitDetailsComponent;
  let fixture: ComponentFixture<BusinessUnitDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessUnitDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessUnitDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
