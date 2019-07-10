import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnockoutMessageComponent } from './knockout-message.component';

describe('KnockoutMessageComponent', () => {
  let component: KnockoutMessageComponent;
  let fixture: ComponentFixture<KnockoutMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnockoutMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnockoutMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
