import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRatingModalComponent } from './add-rating-modal.component';

describe('AddRatingModalComponent', () => {
   let component: AddRatingModalComponent;
   let fixture: ComponentFixture<AddRatingModalComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         imports: [AddRatingModalComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(AddRatingModalComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});
