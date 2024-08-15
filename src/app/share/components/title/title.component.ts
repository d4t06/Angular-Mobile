import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-title',
  template: `
    <div
      [class]="
        'flex space-x-[8px] items-center text-[#3f3f3f] text-xl  font-medium ' +
        className
      "
    >
      <ng-content />
    </div>
  `,
})
export class TitleComponent {
  @Input() className: string = '';
}
