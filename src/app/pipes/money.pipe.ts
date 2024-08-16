import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
   standalone: true,
   name: 'money',
})
export class MoneyPipe implements PipeTransform {
   transform(value: number | undefined) {
      if (!value) return 'Contact';
      const formatter = new Intl.NumberFormat('en-US');
      return formatter.format(value) + ' đ';
   }
}
