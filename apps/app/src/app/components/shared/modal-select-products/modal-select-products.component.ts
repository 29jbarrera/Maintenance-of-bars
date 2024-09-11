import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { clientOrganizationTrpc } from '@komandero/clientTRPC';
import { ProductCategories } from './types';
import { AccordionModule } from 'primeng/accordion';
import { FormsModule } from '@angular/forms';
import { ProgressBarModule } from 'primeng/progressbar';

export type ProductSelected = {
  id: string;
  name: string;
};

@Component({
  standalone: true,
  imports: [CommonModule, IonicModule, AccordionModule, FormsModule, ProgressBarModule],
  templateUrl: './modal-select-products.component.html',
  styleUrl: './modal-select-products.component.scss',
})
export class ModalSelectProductsComponent {
  @Input() organization_id: string = '';
  @Input() products_selected: ProductSelected[] = [];

  loading: boolean = false;
  product_categories: ProductCategories = [];

  constructor(public _modalController: ModalController) {}

  ionViewWillEnter() {
    this.categories_with_products();
  }

  private async categories_with_products() {

    this.loading = true;
    const { categories } =
      await clientOrganizationTrpc.share.select_products.mutate({
        organization_id: this.organization_id,
      });
    this.product_categories = categories;
    this.loading = false
  }

  selectAllProducts(event: any) {
    this.product_categories.map((_category) => {
      this.is_checked_category(_category);
      this.selectAllProductsOfCategory(event, _category);
    });
  }

  getProductsOfCategory(category: ProductCategories[0]) {
    return category.product;
  }

  is_checked_category(category: ProductCategories[0]) {
    const products = category.product;

    const isChecked = products.every((_product) => {
      return !!this.products_selected.find((p) => p.id === _product.id);
    });

    return isChecked;
  }

  selectAllProductsOfCategory(event: any, category: ProductCategories[0]) {
    const shouldSelect = event.detail.checked;

    const products_add_or_remove = category.product.map(
      (product: { id: string; name: string }) => {
        return {
          id: product.id,
          name: product.name,
        };
      }
    );

    if (shouldSelect) {
      this.products_selected.push(...products_add_or_remove);
    } else {
      this.products_selected = this.products_selected.filter((_product) => {
        return !products_add_or_remove.find(
          (_add_or_remove) => _add_or_remove.id === _product.id
        );
      });
    }
  }

  getElementsSelected(category: ProductCategories[0]){
    const elements_selected = category.product.filter(_product => 
      this.products_selected.find(selectedProduct => selectedProduct.id === _product.id)
    );

    return elements_selected;
  }

  getColorOfHeader(category: ProductCategories[0]){
    return this.getElementsSelected(category).length && 'surface-km-accordion' || '';
  }

  addRemoveProduct(event: any, product: any) {
    const shouldAdd = event.detail.checked;

    const { id, name } = product;
    const add_product = { id, name };

    if (shouldAdd) {
      this.products_selected.push(add_product);
    } else {
      this.products_selected = this.products_selected.filter(
        (_product) => _product.id !== id
      );
    }
  }

  isCheckedProduct(product_id: string) {
    const isChecked = !!this.products_selected.find(
      (product) => product.id === product_id
    );
    return isChecked;
  }

  confirm_selection() {
    this._modalController.dismiss(
      {
        products_selected: this.products_selected,
      },
      'confirm'
    );
  }

  close() {
    this._modalController.dismiss();
  }
}
