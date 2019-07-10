import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveySupervisorCreateComponent } from './survey-supervisor-create.component';

describe('SurveySupervisorCreateComponent', () => {
  let component: SurveySupervisorCreateComponent;
  let fixture: ComponentFixture<SurveySupervisorCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveySupervisorCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveySupervisorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
