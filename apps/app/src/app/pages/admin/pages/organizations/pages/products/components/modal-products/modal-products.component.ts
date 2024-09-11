import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { productForm, Categories } from '../../type';
import { IonicModule, ModalController } from '@ionic/angular';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormProductComponent } from '../form-product/form-product.component';

@Component({
  selector: 'app-modal-products',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    FormProductComponent,
  ],
  templateUrl: './modal-products.component.html',
  styleUrl: './modal-products.component.scss',
})
export class ModalProductsComponent {
  @Input() categories!: Categories;
  @Input() form_product = productForm();
  @Input() title_modal!: string;
  @Input() action!: string;
  public categories_selected!: any;

  constructor(public modalController: ModalController) {}

  submit() {
    this.form_product.markAllAsTouched();
    if (this.form_product.invalid) {
      return;
    }
    if (this.action === 'edit') {
      this.edit_product();
    }
    this.add_product();
  }

  add_product() {
    if (this.form_product.invalid) return;
    this.modalController.dismiss(this.form_product.value, 'add');
  }

  edit_product() {
    if (this.form_product.invalid) return;
    this.modalController.dismiss(this.form_product.value, 'edit');
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
