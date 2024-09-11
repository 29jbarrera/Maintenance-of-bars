import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { CartProducts, Order } from '../../type';
import { cent_to_eur_format, format_price_amount } from '@komandero/commons';

@Component({
  selector: 'app-modal-view-orders',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './modal-view-orders.component.html',
  styleUrl: './modal-view-orders.component.scss',
})
export class ModalViewOrdersComponent {
  @Input() cart_products: CartProducts = [];
  @Input() eating_table_name: string = '';
  @Input() order!: Order;

  constructor(private _modalController: ModalController) {}

  close() {
    this._modalController.dismiss();
  }

  getTotalAmount() {
    let total = 0;

    this.cart_products.forEach((product: any) => {
      total += product.quantity * product.price_pick_up;
    });

    return format_price_amount(total);
  }

  getAmount(product: any) {
    const amount = product.quantity * product.price_pick_up;
    return cent_to_eur_format(amount);
  }
}
