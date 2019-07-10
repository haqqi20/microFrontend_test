import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveySurveyorCreateComponent } from './survey-surveyor-create.component';

describe('SurveySurveyorCreateComponent', () => {
  let component: SurveySurveyorCreateComponent;
  let fixture: ComponentFixture<SurveySurveyorCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveySurveyorCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveySurveyorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
