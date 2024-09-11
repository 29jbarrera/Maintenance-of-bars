import { Pipe, PipeTransform } from '@angular/core';
import { stringOneIncludeInStringTwo } from '@komandero/commons';

@Pipe({
  name: 'filterCategory',
  standalone: true,
})
export class FilterCategory implements PipeTransform {
  transform(categories: any[], search_term: string): any[] {
    if (!categories) return [];

    if (!search_term) return categories;

    return categories.filter((category: any) => {
      const name = category.name;
      const matchName = stringOneIncludeInStringTwo(search_term, name);

      return matchName;
    });
  }
}
