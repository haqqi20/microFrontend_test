import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveySupervisorDetailComponent } from './survey-supervisor-detail.component';

describe('SurveySupervisorDetailComponent', () => {
  let component: SurveySupervisorDetailComponent;
  let fixture: ComponentFixture<SurveySupervisorDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveySupervisorDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveySupervisorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
