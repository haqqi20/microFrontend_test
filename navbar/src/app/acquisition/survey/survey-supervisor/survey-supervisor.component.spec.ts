import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveySupervisorComponent } from './survey-supervisor.component';

describe('SurveySupervisorComponent', () => {
  let component: SurveySupervisorComponent;
  let fixture: ComponentFixture<SurveySupervisorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveySupervisorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveySupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
