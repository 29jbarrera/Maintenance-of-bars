import { Pipe, PipeTransform } from '@angular/core';
import { ProductOfCategory } from './types';
import { stringOneIncludeInStringTwo } from '@komandero/commons';

@Pipe({
  name: 'FilterProductCategory',
  standalone: true,
})
export class FilterProductCategoryPipe implements PipeTransform {
  transform(
    products: ProductOfCategory[] | undefined,
    search_term: string
  ): ProductOfCategory[] {
    if (!products) return [];

    if (!search_term) return products;

    return products.filter((product) =>
      stringOneIncludeInStringTwo(search_term, product.name)
    );
  }
}
