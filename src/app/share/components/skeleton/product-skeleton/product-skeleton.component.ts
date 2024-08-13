import { Component, Input } from "@angular/core";
import { SkeletonComponent } from "../skeleton.component";


@Component({
    standalone: true,
    selector: 'app-product-skeleton',
    template: `

    <app-skeleton [class]="['min-h-[320px]', props.class]" />
    `,
    imports: [SkeletonComponent]
})

export class ProductSkeletonComponent {
    @Input() props: {class?: string} = {}
}