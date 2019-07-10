import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessUnitAddComponent } from './business-unit-add.component';

describe('BusinessUnitAddComponent', () => {
  let component: BusinessUnitAddComponent;
  let fixture: ComponentFixture<BusinessUnitAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessUnitAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessUnitAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
