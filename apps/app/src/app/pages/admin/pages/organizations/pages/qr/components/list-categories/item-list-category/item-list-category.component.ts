import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CategoryQR } from '../../../qr-admin.type';

@Component({
  selector: 'app-item-list-category',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './item-list-category.component.html',
  styleUrl: './item-list-category.component.scss',
})
export class ItemListCategoryComponent {
  @Input() category!: CategoryQR;
  @Input() order_categories: boolean = false;
  
  @Output() change_order_categories_of_products: EventEmitter<CategoryQR> = new EventEmitter<CategoryQR>();
  @Output() goToManageCategory: EventEmitter<CategoryQR['id']>  = new EventEmitter<CategoryQR['id']>();

}
