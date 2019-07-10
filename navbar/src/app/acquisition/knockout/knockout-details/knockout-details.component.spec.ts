import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnockoutDetailsComponent } from './knockout-details.component';

describe('KnockoutDetailsComponent', () => {
  let component: KnockoutDetailsComponent;
  let fixture: ComponentFixture<KnockoutDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnockoutDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnockoutDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
