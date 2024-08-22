import { newArray } from '@/app/share/utils/appHelper';
import { Component } from '@angular/core';
import { SkeletonComponent } from '../../share/components/skeleton/skeleton.component';

@Component({
   standalone: true,
   selector: 'app-check-out-skeleton',
   template: `
      @for (key of newArray(3); track $index) {
         <div class="mb-8 space-y-4">
            <app-skeleton className="w-[200px] rounded-lg h-[28px] max-w-[30%]" />
            <app-skeleton className="mt-2 w-full rounded-xl h-[200px]" />
         </div>
      }
   `,
   imports: [SkeletonComponent],
})
export class CheckOutSkeleton {
   newArray = newArray;
}
