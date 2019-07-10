import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLookupDetailComponent } from './edit-lookup-detail.component';

describe('EditLookupDetailComponent', () => {
  let component: EditLookupDetailComponent;
  let fixture: ComponentFixture<EditLookupDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLookupDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLookupDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
