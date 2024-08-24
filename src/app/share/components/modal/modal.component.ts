import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';
import { Component, Input, ViewChild } from '@angular/core';
import { ModalHeaderComponent } from './modal-header.component';

@Component({
   standalone: true,
   selector: 'app-modal',
   template: `
      <ng-template cdkPortal>
         <div
            (click)="close()"
            [class]="[
               'absolute',
               'inset-0',
               'z-99',
               'bg-black/40',
               'opacity-0',
               'transition-opacity',
               isOpen ? 'opacity-100' : '',
            ]"></div>

         <div
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[99] bg-white p-3 md:p-4 rounded-xl">
            <app-modal-header (closeModal)="close()" [title]="title" />
            <ng-content />
         </div>
      </ng-template>
   `,
   imports: [ModalHeaderComponent, PortalModule],
})
export class ModalComponent {
   @Input() title: string = '';
   @ViewChild(CdkPortal) portal: CdkPortal;

   overlayRef: OverlayRef;
   isOpen = false;

   constructor(private overlay: Overlay) {}

   open() {
      this.isOpen = true;

      this.overlayRef = this.overlay.create();

      this.overlayRef.backdropClick().subscribe(() => this.close());
      this.overlayRef.attach(this.portal);
   }

   close() {
      this.isOpen = false;
      if (this.overlayRef) this.overlayRef.detach();
   }
}
