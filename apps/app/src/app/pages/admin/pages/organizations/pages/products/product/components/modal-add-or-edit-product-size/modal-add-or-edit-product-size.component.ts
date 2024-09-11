import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalController, IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { addOrEditProductSize } from '../../../type';
import { getFormErrorMessage, isFormFieldInvalid } from '@komandero/web-share';

@Component({
  selector: 'app-modal-add-sizes',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
    ReactiveFormsModule,
  ],
  templateUrl: './modal-add-or-edit-product-size.component.html',
  styleUrl: './modal-add-or-edit-product-size.component.scss',
})
export class ModalAddSizesComponent {
  @Input() availables_product_sizes: any[] = [];
  @Input() form_add_or_edit_product_size = addOrEditProductSize();

  public showErrors = false;

  constructor(private modalController: ModalController) {}

  async submit() {
    this.form_add_or_edit_product_size.markAllAsTouched();
    if (this.form_add_or_edit_product_size.invalid) {
      this.showErrors = true;
      return;
    }
    await this.modalController.dismiss(
      this.form_add_or_edit_product_size.value,
      'create'
    );
  }

  getFormErrorMessage(name: string) {
    return getFormErrorMessage(name, this.form_add_or_edit_product_size);
  }

  isFormFieldInvalid(name: string) {
    return isFormFieldInvalid(name, this.form_add_or_edit_product_size);
  }

  close_modal() {
    this.modalController.dismiss();
  }
}
