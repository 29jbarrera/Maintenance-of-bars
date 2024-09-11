import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from '../../type';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-product-category-item',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './product-category-item.component.html',
  styleUrl: './product-category-item.component.scss',
})
export class ProductCategoryItemComponent {
  @Input() category!: Category;
  @Input() line: 'full' | 'none' = 'full';
  @Input() order_categories = false;

  @Output() delete_product_category = new EventEmitter<Category>();
  @Output() view_modal_product_categories = new EventEmitter<Category>();
  @Output() view_category = new EventEmitter<Category>();
}
