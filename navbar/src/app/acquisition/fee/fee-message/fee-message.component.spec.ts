import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeMessageComponent } from './fee-message.component';

describe('FeeMessageComponent', () => {
  let component: FeeMessageComponent;
  let fixture: ComponentFixture<FeeMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeeMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeeMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
