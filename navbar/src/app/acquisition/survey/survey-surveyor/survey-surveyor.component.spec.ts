import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveySurveyorComponent } from './survey-surveyor.component';

describe('SurveySurveyorComponent', () => {
  let component: SurveySurveyorComponent;
  let fixture: ComponentFixture<SurveySurveyorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveySurveyorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveySurveyorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
