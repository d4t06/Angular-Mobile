import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

type Props = {
  class?: string;
};

@Component({
  standalone: true,
  selector: 'app-skeleton',
  imports: [NgClass],
  template: `
    <div
      [class]="'animate-pulse rounded-md bg-[#e1e1e1] ' + this.props.class || ''"
    ></div>
  `,
})
export class SkeletonComponent {
  @Input() props: Props = { };
}
