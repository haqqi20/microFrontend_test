import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalSetComponent } from './global-set.component';

describe('GlobalSetComponent', () => {
  let component: GlobalSetComponent;
  let fixture: ComponentFixture<GlobalSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
