import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  standalone: true,
  selector: 'app-confirm-modal',
  template: `
    <p class="font-medium text-red-500">This action cannot be undone</p>
    <div class="flex space-x-2 mt-4">
      <app-button (myClick)="onClose()" [props]="{ colors: 'second' }">
        Close
      </app-button>
      <app-button [props]="{loading}" (myClick)="onAccept()">
        Yes please
      </app-button>
    </div>
  `,
  imports: [ButtonComponent],
})
export class ConfirmModalComponent {
  @Input() loading: boolean = false;
  @Output() accept = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
  onAccept() {
    this.accept.emit();
  }
}
