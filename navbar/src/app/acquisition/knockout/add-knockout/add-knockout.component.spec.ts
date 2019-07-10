import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKnockoutComponent } from './add-knockout.component';

describe('AddKnockoutComponent', () => {
  let component: AddKnockoutComponent;
  let fixture: ComponentFixture<AddKnockoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddKnockoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddKnockoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
