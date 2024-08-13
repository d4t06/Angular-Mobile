import { Component, Input } from '@angular/core';
import { cva } from 'class-variance-authority';

const classes = {
  container: `relative rounded before:absolute before:content-[""] before:inset-0 z-0 before:bg-[#fff] before:border-[#ccc] before:z-[-1] `,
};

const pushFrameVariant = cva(classes.container, {
  variants: {
    size: {
      primary:
        'before:rounded-xl rounded-xl before:border-[4px] before:shadow-[0_4px_0_#ccc] p-[14px] active:translate-y-[4px]',
      small:
        'before:p-2 p-2 before:border-[2px] before:shadow-[0_2px_0_#ccc] p-[10px] active:translate-y-[2px]',
    },
    pushAble: {
      primary: 'active:before:shadow-none',
      clear: 'active:translate-y-[none]',
    },
  },

  defaultVariants: {
    size: 'primary',
    pushAble: 'primary',
  },
});

type Props = {
  size?: 'primary' | 'small' | null | undefined;
  pushAble?: 'primary' | 'clear' | null | undefined;
  class?: string;
};

@Component({
  selector: 'app-push-frame',
  standalone: true,
  imports: [],
  templateUrl: './push-frame.component.html',
})
export class PushFrameComponent {
  @Input() props: Props = {};

  pushFrameVariant = pushFrameVariant;
}
