import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ARCardComponent } from './arcard.component';

describe('ARCardComponent', () => {
  let component: ARCardComponent;
  let fixture: ComponentFixture<ARCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ARCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ARCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
