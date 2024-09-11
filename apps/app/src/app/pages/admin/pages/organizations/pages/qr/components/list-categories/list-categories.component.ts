import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CategoriesQR, CategoryQR } from '../../qr-admin.type';
import { ItemListCategoryComponent } from './item-list-category/item-list-category.component';

@Component({
  selector: 'app-list-categories',
  standalone: true,
  imports: [CommonModule, IonicModule, ItemListCategoryComponent],
  templateUrl: './list-categories.component.html',
  styleUrl: './list-categories.component.scss',
})
export class ListCategoriesComponent {
  @Input() categories: CategoriesQR = [];
  @Input() order_categories: boolean = false;

  @Output() change_order_categories_of_products: EventEmitter<CategoryQR> =
    new EventEmitter<CategoryQR>();
  @Output() goToManageCategory: EventEmitter<CategoryQR['id']> =
    new EventEmitter<CategoryQR['id']>();
  @Output() handleReorder: EventEmitter<any> = new EventEmitter<any>();
}
