import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoringDetailComponent } from './scoring-detail.component';

describe('ScoringDetailComponent', () => {
  let component: ScoringDetailComponent;
  let fixture: ComponentFixture<ScoringDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoringDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoringDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
