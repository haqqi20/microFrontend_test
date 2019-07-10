import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLookupDetailComponent } from './add-lookup-detail.component';

describe('AddLookupDetailComponent', () => {
  let component: AddLookupDetailComponent;
  let fixture: ComponentFixture<AddLookupDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLookupDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLookupDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
