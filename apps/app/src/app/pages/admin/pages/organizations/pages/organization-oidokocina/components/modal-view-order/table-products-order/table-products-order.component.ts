import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Detalle,
  format_price_amount,
  ProductoOpciones,
} from '@komandero/commons';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-table-products-order',
  standalone: true,
  imports: [CommonModule, TagModule],
  templateUrl: './table-products-order.component.html',
  styleUrl: './table-products-order.component.scss',
})
export class TableProductsOrderComponent {
  @Input() details: Detalle[] = [];

  // Formatear Importe
  format_price(amount: number) {
    return format_price_amount(amount);
  }

  // Opciones de un producto
  get_product_options(options: ProductoOpciones[]) {
    return options || [];
  }
}
