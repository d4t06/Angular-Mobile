import GetRatingService from '@/app/services/get-rating.service';
import RatingAverage from '@/app/services/rating-average.service';
import { TitleComponent } from '@/app/share/components/title/title.component';
import { ProductDetailStore } from '@/app/stores/product-detail.store';
import RatingStore from '@/app/stores/rating.store';
import { Component, ViewChild, inject } from '@angular/core';
import { SkeletonComponent } from '../../../../share/components/skeleton/skeleton.component';
import { NoResultComponent } from '../../../../share/components/no-result/no-product.component';
import { RatingItemComponent } from '../../../rating-item/rating-item.component';
import { ButtonComponent } from '../../../../share/components/button/button.component';
import { newArray } from '@/app/share/utils/appHelper';
import { ModalComponent } from "../../../../share/components/modal/modal.component";
import { AddRatingModalComponent } from "./_components/add-rating-modal/add-rating-modal.component";
import { AuthStore } from '@/app/stores/auth.store';


@Component({
   selector: 'app-product-rating',
   standalone: true,
   imports: [
    TitleComponent,
    SkeletonComponent,
    NoResultComponent,
    RatingItemComponent,
    ButtonComponent,
    ModalComponent,
    AddRatingModalComponent
],
   providers: [GetRatingService, RatingAverage],
   templateUrl: './product-rating.component.html',
   styles: ``,
})
export class ProductRatingComponent {
   ratingStore = inject(RatingStore);
   productDetail = inject(ProductDetailStore);
   authStore = inject(AuthStore)

   getRating = inject(GetRatingService);
   ratingAverage = inject(RatingAverage);

   @ViewChild(ModalComponent, { static: true })
   modalComponent: ModalComponent;


   openModal() {
      this.modalComponent.open();
   }

   closeModal() {
      this.modalComponent.close();
   }

   newArray = newArray;

   handleGetMore() {
      if (!this.productDetail.product) return;
      this.getRating.getProductRatings({productId: this.productDetail.product.id, page: this.ratingStore.page + 1})
   }

   ngOnInit() {
      this.productDetail.status.subscribe(() => {
         const product = this.productDetail.product;
         if (product) {
            this.getRating.getProductRatings({
               productId: product.id,
               page: 1,
               replace: true,
            });

            this.ratingAverage.getRatingAverage(product.id);
         }
      });
   }
}
