import { Component } from '@angular/core';
import { SkeletonComponent } from '@/app/share/components/skeleton/skeleton.component';
import { newArray } from '@/app/share/utils/appHelper';
import { PushFrameComponent } from '../../../../../share/components/push-frame/push-frame.component';

@Component({
   standalone: true,
   selector: 'app-product-info-skeleton',
   template: `
      <app-skeleton myClass="w-[300px] h-[36px]  " />

      <app-push-frame [props]="{ class: 'mt-5' }">
         <div class="space-y-5">
            <div class="">
               <app-skeleton myClass="w-[70px] h-[20px]" />
               <div class="flex flex-wrap -mx-1">
                  @for (key of newArray(2); track $index) {
                     <div class="w-1/3 px-1 mt-1">
                        <app-skeleton myClass="h-[60px] " />
                     </div>
                  }
               </div>
            </div>

            <div class="">
               <app-skeleton myClass="w-[70px] h-[20px]  mt-[14px]" />
               <div class="flex flex-wrap -mx-1">
                  @for (key of newArray(2); track $index) {
                     <div class="w-1/3 px-1 mt-1">
                        <app-skeleton myClass="h-[60px] " />
                     </div>
                  }
               </div>
            </div>

            <div class="">
               <app-skeleton myClass="w-[70px] h-[20px] " />
               <app-skeleton myClass="w-[200px] h-[36px] rounded-md mt-1" />
            </div>
         </div>
      </app-push-frame>
   `,
   imports: [SkeletonComponent, PushFrameComponent],
})
export class ProductDetailInfoSkeleton {
   newArray = newArray;
}
