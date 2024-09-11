import { Pipe, PipeTransform } from '@angular/core';
import { stringOneIncludeInStringTwo } from '@komandero/commons';
import {
  GroupSelected,
  Product,
  ProductModifications,
  ProductModificationsGroups,
} from './type';

@Pipe({
  name: 'filterModificationGroup',
  standalone: true,
})
export class FilterModificationGroup implements PipeTransform {
  transform(
    groups: ProductModificationsGroups,
    search_term: string
  ): ProductModificationsGroups {
    if (!groups) return [];

    if (!search_term) return groups;

    return groups.filter((group: GroupSelected) => {
      return filter_by_name(group, search_term);
    });
  }
}

@Pipe({
  name: 'filterModificationProduct',
  standalone: true,
})
export class FilterModificationProduct implements PipeTransform {
  transform(
    products: ProductModifications,
    search_term: string
  ): ProductModifications {
    if (!products) return [];

    if (!search_term) return products;

    return products.filter((product: Product) => {
      return filter_by_name(product, search_term);
    });
  }
}

function filter_by_name(item: GroupSelected | Product, search_term: string) {
  const { name } = item;
  return stringOneIncludeInStringTwo(search_term, name);
}
