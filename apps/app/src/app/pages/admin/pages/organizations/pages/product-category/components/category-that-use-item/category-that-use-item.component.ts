import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Category } from '../../types';

@Component({
  selector: 'app-category-that-use-item',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './category-that-use-item.component.html',
  styleUrl: './category-that-use-item.component.scss',
})
export class CategoryThatUseItemComponent {
  @Input() category!: Category['product_category_has_other_product_category_product_category_has_other_product_category_pc_idToproduct_category'][0];
  @Input() line: 'full' | 'none' = 'full';
  @Output() delete_category_that_use = new EventEmitter<any>();
  @Output() view_modal_edit = new EventEmitter<any>();
}
