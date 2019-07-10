import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeMessageComponent } from './office-message.component';

describe('OfficeMessageComponent', () => {
  let component: OfficeMessageComponent;
  let fixture: ComponentFixture<OfficeMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
