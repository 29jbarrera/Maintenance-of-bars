import { Pipe, PipeTransform } from '@angular/core';
import { stringOneIncludeInStringTwo } from '@komandero/commons';
import {
  FilterModifierSelected,
  FilterSizeSelected,
  ProductsList,
  ProductsListItem,
} from './type';

@Pipe({
  name: 'FilterProductsAdmin',
  standalone: true,
})
export class FilterProductsAdminPipe implements PipeTransform {
  transform(
    products: ProductsList,
    search_term: string,
    categories_selecteds: string[],
    size_filter_selected: FilterSizeSelected,
    modifier_filter_selected: FilterModifierSelected
  ): ProductsList {
    if (!products) return [];

    const has_not_category_selected = !categories_selecteds.length;
    const has_not_searchTerm = !search_term.trim();
    const has_not_modifier_selected = !modifier_filter_selected.length;
    const has_not_size_selected = !size_filter_selected.length;

    if ( has_not_category_selected && has_not_searchTerm && has_not_modifier_selected) {
      return this.filterBySize(products, size_filter_selected);
    }

    if ( has_not_category_selected && has_not_searchTerm && has_not_size_selected ) {
      return this.filterByModifier(products, modifier_filter_selected);
    }

    return products.filter((product: ProductsListItem) => {
      const product_by_category = this.filterByCategory(
        categories_selecteds,
        product
      );
      const product_by_size = this.filterBySizeOption(
        size_filter_selected,
        product
      );
      const product_by_modifier = this.filterByModifierOption(
        modifier_filter_selected,
        product
      );
      const product_name = this.filterByName(product, search_term);

      return (
        product_by_category &&
        product_by_size &&
        product_by_modifier &&
        product_name
      );
    });
  }

  private filterBySize(
    products: ProductsList,
    sizeFilter: FilterSizeSelected
  ): ProductsList {
    return products.filter((product) =>
      this.filterBySizeOption(sizeFilter, product)
    );
  }

  private filterBySizeOption(
    sizeFilter: FilterSizeSelected,
    product: ProductsListItem
  ): boolean {
    if (sizeFilter === 'with_size') {
      return product.product_size_price.length > 0;
    } else if (sizeFilter === 'without_size') {
      return !product.product_size_price.length;
    } else {
      return true;
    }
  }

  private filterByModifier(
    products: ProductsList,
    modifierFilter: FilterModifierSelected
  ): ProductsList {
    return products.filter((product) =>
      this.filterByModifierOption(modifierFilter, product)
    );
  }

  private filterByModifierOption(
    modifierFilter: FilterModifierSelected,
    product: ProductsListItem
  ): boolean {
    if (modifierFilter === 'with_modifier') {
      return product.product_modification.length > 0;
    } else if (modifierFilter === 'whithout_modifier') {
      return !product.product_modification.length;
    } else {
      return true;
    }
  }

  private filterByName(product: ProductsListItem, searchTerm: string): boolean {
    return stringOneIncludeInStringTwo(
      searchTerm.trim().toLowerCase(),
      product.name.toLowerCase()
    );
  }

  private filterByCategory(
    categoriesSelected: string[],
    product: ProductsListItem
  ): boolean {
    if (!categoriesSelected.length) {
      return true;
    }

    return categoriesSelected.includes(product.product_category_id);
  }
}
