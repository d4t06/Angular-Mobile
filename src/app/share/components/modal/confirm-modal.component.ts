import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
   standalone: true,
   selector: 'app-confirm-modal',
   template: `
      <div class="w-[400px] max-w-[85vw]"></div>
      <ng-content />
      <p class="font-medium text-lg text-red-500">
         {{ desc || 'This action cannot be undone' }}
      </p>
      <div class="flex space-x-2 mt-4">
         <app-button (myClick)="onClose()" [props]="{ colors: 'second' }">
            Close
         </app-button>
         <app-button
            [props]="{ loading, size: 'clear', class: 'h-full w-[116px]' }"
            (myClick)="onAccept()">
            Yes please
         </app-button>
      </div>
   `,
   imports: [ButtonComponent],
})
export class ConfirmModalComponent {
   @Input() loading: boolean = false;
   @Input() desc: string = '';
   @Output() accept = new EventEmitter<void>();
   @Output() close = new EventEmitter<void>();

   onClose() {
      this.close.emit();
   }
   onAccept() {
      this.accept.emit();
   }
}
