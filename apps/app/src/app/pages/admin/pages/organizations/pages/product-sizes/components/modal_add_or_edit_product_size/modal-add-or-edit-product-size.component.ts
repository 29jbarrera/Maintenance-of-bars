import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { InputTextModule } from 'primeng/inputtext';
import { productSizeForm } from '../../type';
import { getFormErrorMessage, isFormFieldInvalid } from '@komandero/web-share';

@Component({
  selector: 'app-modal-add-product-size',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
  ],
  templateUrl: './modal-add-or-edit-product-size.component.html',
  styleUrl: './modal-add-or-edit-product-size.component.scss',
})
export class ModalAddProductSizeComponent {
  @Input() title_modal!: string;
  @Input() action!: string;
  @Input() form_add_or_edit_product_size = productSizeForm();

  constructor(public modalController: ModalController) {}

  submit() {
    if (this.action === 'edit') {
      this.edit_product_size();
    }
    this.add_product_size();
  }

  add_product_size() {
    if (this.form_add_or_edit_product_size.invalid) return;
    this.modalController.dismiss(this.form_add_or_edit_product_size.value, 'add');
  }

  edit_product_size() {
    if (this.form_add_or_edit_product_size.invalid) return;
    this.modalController.dismiss(this.form_add_or_edit_product_size.value, 'edit');
  }

  closeModal() {
    this.modalController.dismiss();
  }

  isFormFieldInvalid(name: string) {
    return isFormFieldInvalid(name, this.form_add_or_edit_product_size);
  }

  getFormErrorMessage(name: string) {
    return getFormErrorMessage(name, this.form_add_or_edit_product_size);
  }
}
