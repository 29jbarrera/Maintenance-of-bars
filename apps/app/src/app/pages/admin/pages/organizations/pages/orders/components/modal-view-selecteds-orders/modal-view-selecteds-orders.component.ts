import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { EatingTables, Orders } from '../../type';
import { AccordionModule } from 'primeng/accordion';
import { cent_to_eur_format, format_price_amount } from '@komandero/commons';

@Component({
  selector: 'app-modal-view-selecteds-orders',
  standalone: true,
  imports: [CommonModule, IonicModule, AccordionModule],
  templateUrl: './modal-view-selecteds-orders.component.html',
  styleUrl: './modal-view-selecteds-orders.component.scss',
})
export class ModalViewSelectedsOrdersComponent {
  @Input() selecteds_orders!: any;
  @Input() eating_tables: EatingTables = [];

  constructor(private _modalController: ModalController) {}

  close() {
    this._modalController.dismiss();
  }

  getAmount(product: any) {
    const amount = product.quantity * product.price_pick_up;
    return format_price_amount(amount);
  }

  getTotalAmountOfAEatingTable(cart_products: any) {
    let total = 0;

    cart_products.forEach((product: any) => {
      total += product.quantity * product.price_pick_up;
    });

    return cent_to_eur_format(total);
  }

  getTotalAmountOfOrders() {
    let total = 0;

    this.selecteds_orders.forEach((order: any) => {
      order.cart_products.forEach((product: any) => {
        total += product.quantity * product.price_pick_up;
      });
    });

    return cent_to_eur_format(total);
  }

  getEatingTable(eating_table_id: any) {
    let name = '';

    this.eating_tables.forEach((table) => {
      if (table.id === eating_table_id) {
        name = table.name;
      }
    });

    return name;
  }
}
