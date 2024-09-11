import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { productCategoriesForm } from '../../type';
import { IonicModule, ModalController } from '@ionic/angular';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Category } from '../../../products/type';
import { getFormErrorMessage, isFormFieldInvalid } from '@komandero/web-share';

@Component({
  selector: 'app-modal-edit-product-categories',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
  ],
  templateUrl: './modal-product-categories.component.html',
  styleUrl: './modal-product-categories.component.scss',
})
export class ModalProductCategoriesComponent {
  @Input() category!: Category;
  @Input() title_modal!: string;
  @Input() action!: string;
  @Input() form_product_categories = productCategoriesForm();

  constructor(public modalController: ModalController) {}

  submit() {
    if (this.action === 'edit') {
      this.edit_category();
    }
    this.add_category();
  }

  add_category() {
    if (this.form_product_categories.invalid) return;
    this.modalController.dismiss(this.form_product_categories.value, 'add');
  }

  edit_category() {
    if (this.form_product_categories.invalid) return;
    this.modalController.dismiss(this.form_product_categories.value, 'edit');
  }

  closeModal() {
    this.modalController.dismiss();
  }

  isFormFieldInvalid(name: string) {
    return isFormFieldInvalid(name, this.form_product_categories);
  }

  getFormErrorMessage(name: string) {
    return getFormErrorMessage(name, this.form_product_categories);
  }
}
