import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeNameLookupComponent } from './fee-name-lookup.component';

describe('FeeNameLookupComponent', () => {
  let component: FeeNameLookupComponent;
  let fixture: ComponentFixture<FeeNameLookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeeNameLookupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeeNameLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
