import { Component, Input } from '@angular/core';
import { generateHsl } from '../../utils/generateHsl';

@Component({
   selector: 'app-avatar',
   standalone: true,
   imports: [],
   templateUrl: './avatar.component.html',
})
export class AvatarComponent {
   @Input({ required: true }) name: string;

   generateHsl = generateHsl;
}
