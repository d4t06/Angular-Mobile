import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-attribute-item',
  template: `
    <tr>
      <td class="w-[40%]">{{ foundedCatAttribute?.attribute || '---' }}</td>
      <td class="leading-[1.6]">{{ foundedProAttribute?.value || '---' }}</td>
    </tr>
  `,
})
export class AttributeItem {
  @Input({ required: true }) attributeId: number;
  @Input({ required: true }) product: ProductDetail;

  foundedCatAttribute: CategoryAttribute | undefined;
  foundedProAttribute: ProductAttribute | undefined;

  constructor() {}

  ngOnInit() {
    this.foundedCatAttribute = this.product.category.attributes.find(
      (attr) => attr.id === this.attributeId
    );

    this.foundedProAttribute = this.foundedCatAttribute
      ? this.product.attributes.find(
          (attr) => attr.category_attribute_id === this.foundedCatAttribute?.id
        )
      : undefined;
  }

  ngDoCheck() {}
}
