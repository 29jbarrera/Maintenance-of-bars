import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ProductOfCategory } from '../../types'; 
@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent {
  @Input() product!: ProductOfCategory;
  @Input() line: 'full' | 'none' = 'full';
  @Output() delete_product: EventEmitter<any> = new EventEmitter<any>();
}
