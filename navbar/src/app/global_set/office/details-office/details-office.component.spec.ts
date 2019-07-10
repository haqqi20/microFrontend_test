import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsOfficeComponent } from './details-office.component';

describe('DetailsOfficeComponent', () => {
  let component: DetailsOfficeComponent;
  let fixture: ComponentFixture<DetailsOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
