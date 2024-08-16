import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../../../share/components/button/button.component';

@Component({
   standalone: true,
   selector: 'app-variant-box',
   imports: [ButtonComponent],
   template: `
      <app-button
         [props]="{
            class: 'storage-item w-full py-[4px] text-[14px]',
            colors: 'second',
            active,
         }"
         (click)="handleSetActiveVariant()">
         {{ variant.variant }}
      </app-button>
   `,
})
export class VariantBox {
   @Input() variant!: ProductVariantDetail;
   @Input() active!: boolean;
   @Output() onChangeActiveVariant = new EventEmitter<ProductVariantDetail>();

   handleSetActiveVariant = () =>
      !this.active && this.onChangeActiveVariant.emit(this.variant);
}
