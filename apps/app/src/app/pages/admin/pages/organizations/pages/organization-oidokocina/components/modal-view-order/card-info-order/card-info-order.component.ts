import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  format_price_amount,
  get_method_delivery,
  get_severity_status,
  get_type_payment_method,
  OK_PEDIDO_UNO,
  OK_TYPE_OF_STATE,
} from '@komandero/commons';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-card-info-order',
  standalone: true,
  imports: [CommonModule, TagModule],
  templateUrl: './card-info-order.component.html',
  styleUrl: './card-info-order.component.scss',
})
export class CardInfoOrderComponent {
  @Input() order!: OK_PEDIDO_UNO['pedido'];

  // Color del Estado
  get_severity_status(code: OK_TYPE_OF_STATE) {
    return get_severity_status(code) as any;
  }

  // Método Envío (RECOGEN o DOMICILIO)
  get_method_delivery(type: string) {
    return get_method_delivery(type);
  }

  // Formatear Importe
  format_price(amount: number) {
    return format_price_amount(amount);
  }

  // Método de Pago
  get_type_payment_method(payment_method: string) {
    return get_type_payment_method(payment_method);
  }
}
