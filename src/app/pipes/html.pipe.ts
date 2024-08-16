import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'html', standalone: true })
export class HTMLPipe implements PipeTransform {
   constructor(protected sanitizer: DomSanitizer) {}

   transform(value: string) {
      return this.sanitizer.bypassSecurityTrustHtml(value);
   }
}
