import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgOfficeComponent } from './org-office.component';

describe('OrgOfficeComponent', () => {
  let component: OrgOfficeComponent;
  let fixture: ComponentFixture<OrgOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
