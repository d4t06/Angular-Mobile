import { Component, HostBinding, Input } from '@angular/core';
import { AvatarComponent } from '../../share/components/avatar/avatar.component';
import { newArray } from '@/app/share/utils/appHelper';

@Component({
   selector: 'app-rating-item',
   standalone: true,
   imports: [AvatarComponent],
   templateUrl: './rating-item.component.html',
   styles: ``,
})
export class RatingItemComponent {
   @Input({ required: true }) rating: Rating;

   @HostBinding('class') hostClass = 'block';

   newArray = newArray;
}
