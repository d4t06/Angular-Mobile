import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailTopComponent } from './product-detail-top.component';

describe('ProductDetailTopComponent', () => {
   let component: ProductDetailTopComponent;
   let fixture: ComponentFixture<ProductDetailTopComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         imports: [ProductDetailTopComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(ProductDetailTopComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});
