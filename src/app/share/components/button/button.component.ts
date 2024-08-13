import { CommonModule } from '@angular/common';
import {
  Attribute,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { VariantProps, cva } from 'class-variance-authority';

const classes = {
  active: 'before:shadow-none font-medium translate-y-[2px] text-[#cd1818]',
  button: 'inline-flex relative  items-center justify-center z-0',
};

const ButtonVariant = cva(classes.button, {
  variants: {
    variant: {
      primary:
        "before:content-[''] before:absolute before:z-[-1] before:inset-0 before:rounded-[8px] rounded-[8px]  active:translate-y-[2px] active:before:shadow-none",
      clear: '',
    },
    size: {
      clear: '',
      primary: 'px-[15px] py-[5px]',
    },
    colors: {
      primary:
        'before:border-[#a00000] text-[#fff] bg-[#cd1818] before:shadow-[0_2px_0_#a00000]',
      second:
        'before:border-[#ccc] text-[#333] bg-[#f6f6f6] before:shadow-[0_2px_0_#ccc]',
      third:
        'before:border-[#a00000] bg-[#fff] text-[#000] before:shadow-[0_2px_0_#a00000]',
      clear: '',
    },
    border: {
      primary: 'before:border-[2px]',
      thin: 'before:border-[1px]',
      clear: 'before:border-b-[2px]',
    },
    fontWeight: {
      primary: 'font-medium',
      thin: '',
    },
  },
  defaultVariants: {
    size: 'primary',
    colors: 'primary',
    variant: 'primary',
    border: 'primary',
    fontWeight: 'primary',
  },
});

interface Props extends VariantProps<typeof ButtonVariant> {
  loading?: boolean;
  disabled?: boolean;
  class?: string;
  href?: string;
  active?: boolean;
  type?: HTMLButtonElement['type'];
  click?: void;
}

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './button.component.html',
  host: { ngNoHost: '' },
})
export class ButtonComponent {
  @Input() props: Props = { href: '' };
  @Output() onClick = new EventEmitter<void>();

  ButtonVariant = ButtonVariant;

  classes = classes;

  click() {
    this.onClick.emit();
  }
}
