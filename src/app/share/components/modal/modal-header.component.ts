import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  standalone: true,
  selector: 'app-modal-header',
  template: `
    <div class="flex items-start justify-between mb-4">
      <h1 class="text-xl text-[#333] font-semibold">{{ title }}</h1>

      <app-button
        (myClick)="onCloseModal()"
        [props]="{ size: 'clear', class: 'p-1' }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </app-button>
    </div>
  `,
  imports: [ButtonComponent],
})
export class ModalHeaderComponent {
  @Input({ required: true }) title: string;

  @Output() closeModal = new EventEmitter<void>();

  onCloseModal() {
    this.closeModal.emit();
  }
}
