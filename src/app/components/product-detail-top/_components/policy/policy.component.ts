import { PushFrameComponent } from '@/app/share/components/push-frame/push-frame.component';
import { SkeletonComponent } from '@/app/share/components/skeleton/skeleton.component';
import { TitleComponent } from '@/app/share/components/title/title.component';
import { ProductDetailStore } from '@/app/stores/product-detail.store';
import { Component, inject } from '@angular/core';


@Component({
  standalone: true,
  selector: 'app-policy',
  imports: [PushFrameComponent, SkeletonComponent, TitleComponent],
  templateUrl: './policy.component.html',
})
export class PolicyComponent {
  productDetail = inject(ProductDetailStore);
}
