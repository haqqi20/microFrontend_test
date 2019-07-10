import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveySurveyorDetailComponent } from './survey-surveyor-detail.component';

describe('SurveySurveyorDetailComponent', () => {
  let component: SurveySurveyorDetailComponent;
  let fixture: ComponentFixture<SurveySurveyorDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveySurveyorDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveySurveyorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
