import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnockoutCriteriaComponent } from './knockout-criteria.component';

describe('KnockoutCriteriaComponent', () => {
  let component: KnockoutCriteriaComponent;
  let fixture: ComponentFixture<KnockoutCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnockoutCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnockoutCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
