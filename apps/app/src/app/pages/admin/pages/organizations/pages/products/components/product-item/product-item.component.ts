import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { cent_to_eur } from '@komandero/commons';
import { ProductsListItem } from '../../type';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent {
  @Input() product!: ProductsListItem;
  @Output() delete_product = new EventEmitter<ProductsListItem>();
  @Output() edit_modal_product = new EventEmitter<ProductsListItem>();
  @Output() view_product = new EventEmitter<ProductsListItem>();

  format_price(price: number): number {
    return cent_to_eur(price);
  }
}
