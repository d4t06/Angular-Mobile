import { NgClass } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';

@Component({
   standalone: true,
   selector: 'app-skeleton',
   imports: [NgClass],
   template: `
      <div [class]="'animate-pulse rounded-md bg-[#e1e1e1] ' + this.className"></div>
   `,
})
export class SkeletonComponent {
   @Input() className: string = '';

   //   @HostBinding('class') hostClass = 'block'
}
