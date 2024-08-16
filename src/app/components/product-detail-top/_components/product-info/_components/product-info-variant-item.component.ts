import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { MoneyPipe } from '@/app/pipes/money.pipe';
import { ButtonComponent } from '@/app/share/components/button/button.component';

@Component({
   standalone: true,
   selector: 'app-product-info-variant-item',
   template: `
      @if (defaultCombine) {
         <app-button
            [props]="{
               colors: 'second',
               class: 'h-[60px] !flex-col px-[4px] w-full',
               active,
            }"
            (myClick)="handleSetVariant()">
            <span>{{ variant.variant }}</span>
            <span class="text-sm font-[500]">
               {{ defaultCombine.price | money }}
            </span>
         </app-button>
      }
   `,
   imports: [ButtonComponent, MoneyPipe],
})
export class ProductInfoVariantItem {
   @Input({ required: true }) variant: ProductVariant;
   @Input({ required: true }) defaultCombine: ProductCombine | undefined;
   @Input({ required: true }) active: boolean;

   @Output() myClick = new EventEmitter<void>();

   @HostBinding('class') hostClass = 'block';

   handleSetVariant() {
      this.myClick.emit();
   }
}
