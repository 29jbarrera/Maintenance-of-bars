import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ProductInCategory, ProductsInCategories } from '../../../qr-admin.type';
import { IonicModule } from '@ionic/angular';
import { ItemListProductsComponent } from './item-list-products/item-list-products.component';

@Component({
  selector: 'app-list-products-in-category',
  standalone: true,
  imports: [CommonModule, IonicModule, ItemListProductsComponent],
  templateUrl: './list-products-in-category.component.html',
  styleUrl: './list-products-in-category.component.scss',
})
export class ListProductsInCategoryComponent {

  @Input() products: ProductsInCategories = [];
  @Input() order_products: boolean = false;
  @Input() allergens: any = [];

  @Output() handleReorder: EventEmitter<any> = new EventEmitter<any>();
  @Output() activeAllergen: EventEmitter<any> = new EventEmitter<any>();
  @Output() change_order_of_products: EventEmitter<ProductInCategory> = new EventEmitter<ProductInCategory>();


  active_allergen(product: ProductInCategory, a_id: number){
    const active = {product, a_id}
    this.activeAllergen.emit(active)
  }

}
