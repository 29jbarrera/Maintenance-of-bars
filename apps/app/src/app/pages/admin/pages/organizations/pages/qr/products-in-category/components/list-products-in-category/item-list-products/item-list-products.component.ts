import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ProductInCategory } from '../../../../qr-admin.type';
import { TooltipModule } from 'primeng/tooltip';
import { getNameOfAllergen } from '@komandero/commons';

@Component({
  selector: 'app-item-list-products',
  standalone: true,
  imports: [CommonModule, IonicModule, TooltipModule],
  templateUrl: './item-list-products.component.html',
  styleUrl: './item-list-products.component.scss',
})
export class ItemListProductsComponent {
  @Input() product!: ProductInCategory;
  @Input() allergens: any = [];
  @Input() order_products: boolean = false;

  @Output() activeAllergen: EventEmitter<any> = new EventEmitter<any>();
  @Output() change_order_of_products: EventEmitter<ProductInCategory> = new EventEmitter<ProductInCategory>();

  active_allergen(product: ProductInCategory, a_id: number){
    const active = {product, a_id}
    this.activeAllergen.emit(active)
  }

  getIsActive(product: ProductInCategory, allergen_id: number) {
    const isActive = product.product_allergen.find(
      (a: any) => a.a_id === allergen_id
    );

    return isActive ? 'active' : 'no-active';
  }

  getNameOfAllergen(allergen_id: number){
    return getNameOfAllergen(allergen_id)
  }

}
