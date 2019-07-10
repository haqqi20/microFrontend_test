import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyTemplateCreateComponent } from './survey-template-create.component';

describe('SurveyTemplateCreateComponent', () => {
  let component: SurveyTemplateCreateComponent;
  let fixture: ComponentFixture<SurveyTemplateCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyTemplateCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyTemplateCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
