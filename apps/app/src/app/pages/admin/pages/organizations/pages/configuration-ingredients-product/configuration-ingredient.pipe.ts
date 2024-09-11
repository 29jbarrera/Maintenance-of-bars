import { Pipe, PipeTransform } from '@angular/core';
import { stringOneIncludeInStringTwo } from '@komandero/commons';

@Pipe({
  name: 'filterProducts',
  standalone: true,
})
export class FilterProducts implements PipeTransform {
  transform(products: any[], search_term: string): any[] {
    if(!products) return [];

    if(!search_term) return products;

    return products.filter((_product: any) => {
      
      const name = _product.name;

      return stringOneIncludeInStringTwo(search_term, name)
    })
  }
}
