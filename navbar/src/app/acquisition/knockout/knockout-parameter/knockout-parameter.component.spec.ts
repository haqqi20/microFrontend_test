import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnockoutParameterComponent } from './knockout-parameter.component';

describe('KnockoutParameterComponent', () => {
  let component: KnockoutParameterComponent;
  let fixture: ComponentFixture<KnockoutParameterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnockoutParameterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnockoutParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
