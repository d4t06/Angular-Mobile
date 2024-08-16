import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOutAddressComponent } from './check-out-address.component';

describe('CheckOutAddressComponent', () => {
   let component: CheckOutAddressComponent;
   let fixture: ComponentFixture<CheckOutAddressComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         imports: [CheckOutAddressComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(CheckOutAddressComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});
