import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Category } from '../../types';

@Component({
  selector: 'app-category-that-modify-item',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './category-that-modify-item.component.html',
  styleUrl: './category-that-modify-item.component.scss',
})
export class CategoryThatModifyItemComponent {
  @Input() category!: Category['product_category_has_other_product_category_product_category_has_other_product_category_idToproduct_category'][0];
  @Input() line: 'full' | 'none' = 'full';
  @Output() delete_category_that_modify = new EventEmitter<any>();
  @Output() view_modal_edit = new EventEmitter<any>();


}
