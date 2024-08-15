import { Injectable } from '@angular/core';

@Injectable()
export class GetDefautlCombine {
  color: ProductColor;
  variant: ProductVariant;

  getDefaultCombine(product: ProductDetail) {
    const defaultVariant = product.variants.find(
      (s) => s.id === product!.default_variant.id
    );

    if (!defaultVariant) {
      this.variant = product.variants[0];
      this.color = product.colors[0];

      return;
    }

    const defaultCombineOfVariant = product.combines.find(
      (c) => c.id === defaultVariant.default_combine.combine_id
    );

    const defaultColor = product.colors.find(
      (c) => c.id === defaultCombineOfVariant!.color_id
    );

    this.variant = defaultVariant;

    if (!defaultColor) {
      this.color = product.colors[0];
    } else {
      this.color = defaultColor;
    }
  }
}
