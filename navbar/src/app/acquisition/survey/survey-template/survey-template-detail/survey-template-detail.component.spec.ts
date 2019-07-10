import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyTemplateDetailComponent } from './survey-template-detail.component';

describe('SurveyTemplateDetailComponent', () => {
  let component: SurveyTemplateDetailComponent;
  let fixture: ComponentFixture<SurveyTemplateDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyTemplateDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyTemplateDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
