import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataMasterComponent } from './data-master.component';

describe('DataMasterComponent', () => {
  let component: DataMasterComponent;
  let fixture: ComponentFixture<DataMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
