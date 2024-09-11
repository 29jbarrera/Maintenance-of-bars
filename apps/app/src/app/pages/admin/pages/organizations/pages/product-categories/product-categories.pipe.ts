import { Pipe, PipeTransform } from '@angular/core';
import { Categories } from './type';
import { stringOneIncludeInStringTwo } from '@komandero/commons';

@Pipe({
  name: 'FilterProductCategories',
  standalone: true,
})
export class FilterProductCategoriesPipe implements PipeTransform {
  transform(categories: Categories, search_term: string): Categories {
    if (!categories) return [];

    if (!search_term) return categories;

    return categories.filter((categories: Categories[0]) => {
      const name = categories.name;

      return stringOneIncludeInStringTwo(search_term, name);
    });
  }
}
