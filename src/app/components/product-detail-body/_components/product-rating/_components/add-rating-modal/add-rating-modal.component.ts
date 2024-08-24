import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ButtonComponent } from '../../../../../../share/components/button/button.component';
import { newArray } from '@/app/share/utils/appHelper';
import { FormsModule } from '@angular/forms';
import RatingActionService from '@/app/services/rating-action.service';
import { AuthStore } from '@/app/stores/auth.store';
import { loginClasses } from '@/app/share/classes/login';

@Component({
   selector: 'app-add-rating-modal',
   standalone: true,
   imports: [ButtonComponent, FormsModule],
   templateUrl: './add-rating-modal.component.html',
   providers: [RatingActionService],
   styles: ``,
})
export class AddRatingModalComponent {
   @Input({ required: true }) product: ProductDetail | null;

   @Output() closeModal = new EventEmitter<void>();

   authStore = inject(AuthStore);

   ratingAction = inject(RatingActionService);

   rate = 5;
   ratingContent = '';
   showThankYou = false;

   handleSubmit() {
      // if (!this.authStore.user) return;
      if (!this.product) return;

      const ratingSchema: RatingSchema = {
         content: this.ratingContent,
         product_id: this.product.id,
         rate: this.rate,
         username: 'admin',
      };

      this.ratingAction.action({ variant: 'add', rating: ratingSchema })?.add(() => {
         this.showThankYou = true;
      });
   }

   handleFinish() {
      this.showThankYou = false;
      this.rate = 5;
      this.ratingContent = '';
      this.closeModal.emit();
   }

   newArray = newArray;
   loginClasses = loginClasses;

   readonly satisfactionMap: Record<number, string> = {
      1: 'Very bad',
      2: 'Bad',
      3: 'Good',
      4: 'Very good',
      5: 'Excellent',
   };
}
