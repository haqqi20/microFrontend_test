import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AplicationAddComponent } from './aplication-add.component';

describe('AplicationAddComponent', () => {
  let component: AplicationAddComponent;
  let fixture: ComponentFixture<AplicationAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AplicationAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AplicationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
