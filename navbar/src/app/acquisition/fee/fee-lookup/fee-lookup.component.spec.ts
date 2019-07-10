import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeLookupComponent } from './fee-lookup.component';

describe('FeeLookupComponent', () => {
  let component: FeeLookupComponent;
  let fixture: ComponentFixture<FeeLookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeeLookupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeeLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
