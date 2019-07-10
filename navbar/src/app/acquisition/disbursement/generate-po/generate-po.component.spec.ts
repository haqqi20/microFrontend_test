import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratePOComponent } from './generate-po.component';

describe('GeneratePOComponent', () => {
  let component: GeneratePOComponent;
  let fixture: ComponentFixture<GeneratePOComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratePOComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratePOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
