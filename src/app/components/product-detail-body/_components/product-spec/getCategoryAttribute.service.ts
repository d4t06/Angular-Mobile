import { Injectable } from '@angular/core';
import { AttributePair } from './product-spec.component';

@Injectable()
export class GetCategoryAttribute {
   attributePair: AttributePair[] = [];

  getAttributePair(product: ProductDetail) {
    const order = product.category.attribute_order.split('_');
    const attributePair: AttributePair[] = [];

    if (order.length) {
      order.forEach((id) => {
        const catAttr = product?.category.attributes.find(
          (catAttr) => catAttr.id === +id
        );
        if (catAttr) {
          const proAttr = product?.attributes.find(
            (proAttr) => proAttr.category_attribute_id === catAttr.id
          );
          if (proAttr) {
            attributePair.push({ ...catAttr, value: proAttr.value });
          }
        }

        this.attributePair = attributePair;
      });
    }
  }
}
