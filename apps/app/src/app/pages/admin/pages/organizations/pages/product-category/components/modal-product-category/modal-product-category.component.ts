import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { Categories } from '../../../product-categories/type';

@Component({
  selector: 'app-modal-product-category',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    MultiSelectModule,
  ],
  templateUrl: './modal-product-category.component.html',
  styleUrl: './modal-product-category.component.scss',
})
export class ModalProductCategoryComponent {
  @Input() action: 'add_category_that_modify' | 'add_category_that_use' = 'add_category_that_modify';
  @Input() title_modal!: string;
  @Input() categories: Categories = [];
  public categories_selected!: any;

  constructor(public modalController: ModalController) {}

  submit() {
    const data = {
        id: this.categories_selected,
    };
    this.modalController.dismiss(data, this.action);
}

add_category(action: 'add_category_that_modify' | 'add_category_that_use') {
    if (!this.categories_selected) return;
    this.modalController.dismiss(this.categories_selected, action);
}

  edit_category() {
    if (!this.categories_selected) return;
    this.modalController.dismiss(this.categories_selected, 'edit');
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
