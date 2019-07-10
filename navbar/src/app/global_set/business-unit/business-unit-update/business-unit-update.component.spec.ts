import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessUnitUpdateComponent } from './business-unit-update.component';

describe('BusinessUnitUpdateComponent', () => {
  let component: BusinessUnitUpdateComponent;
  let fixture: ComponentFixture<BusinessUnitUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessUnitUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessUnitUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
