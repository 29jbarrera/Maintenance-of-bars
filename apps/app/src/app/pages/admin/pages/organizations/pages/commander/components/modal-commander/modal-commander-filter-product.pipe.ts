import { Pipe, PipeTransform } from '@angular/core';
import { stringOneIncludeInStringTwo } from '@komandero/commons';

@Pipe({
  name: 'filterProduct',
  standalone: true,
})
export class FilterProduct implements PipeTransform {
  transform(categories: any[], search_term: string): any[] {
    if (!categories) return [];

    if (!search_term) return categories;

    return categories
      .map((_category: any) => {
        const filteredProducts: any[] = filterProductInCategory(
          _category,
          search_term
        );

        return filteredProducts.length && { ..._category, product: filteredProducts };
      })
      .filter((_category: any) => _category);
  }
}

function filterProductInCategory(_category: any, search_term: string) {
  return _category.product.filter((_product: any) => {
    return filterProduct(_product, search_term);
  });
}

function filterProduct(_product: any, search_term: string) {
  const { name } = _product;
  return stringOneIncludeInStringTwo(search_term, name);
}
