import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductCategoriesForm } from '../../types';
import { InputSwitchModule } from 'primeng/inputswitch';

@Component({
  selector: 'app-modal-edit-product-category',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputSwitchModule,
  ],
  templateUrl: './modal-edit-product-category.component.html',
  styleUrl: './modal-edit-product-category.component.scss',
})
export class ModalEditProductCategoryComponent {
  @Input() title_modal!: string;
  @Input() action!: string;
  @Input() form_product_categories!: ProductCategoriesForm;
  @Input() type_edit_function!: string;

  constructor(public modalController: ModalController) {}

  submit() {
    if (this.action === 'edit') {
      this.edit_category();
    }
  }

  edit_category() {
    if (this.form_product_categories.invalid) return;

    const result = {
      formData: this.form_product_categories.value,
      type_edit_function: this.type_edit_function,
    };

    this.modalController.dismiss(result, 'edit');
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
