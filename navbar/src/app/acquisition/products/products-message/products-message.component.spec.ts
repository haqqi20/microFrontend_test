import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsMessageComponent } from './products-message.component';

describe('ProductsMessageComponent', () => {
  let component: ProductsMessageComponent;
  let fixture: ComponentFixture<ProductsMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
