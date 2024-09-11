import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { getFormErrorMessage, isFormFieldInvalid } from '@komandero/web-share';
import { productModificationEditPriceAndOrderForm } from '../../types';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-modal-edit-product-modification',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule, FormsModule, InputTextModule],
  templateUrl: './modal-edit-product-modification.component.html',
  styleUrl: './modal-edit-product-modification.component.scss',
})
export class ModalEditProductModificationComponent {

  @Input() modification: any;
  @Input() form_edit_product_modification = productModificationEditPriceAndOrderForm();


  constructor(private _modalController: ModalController){}


  isFormFieldInvalid(name: string) {
    return isFormFieldInvalid(name, this.form_edit_product_modification);
  }

  getFormErrorMessage(name: string) {
    return getFormErrorMessage(name, this.form_edit_product_modification);
  }


  close_modal(){
    this._modalController.dismiss()
  }

  update_product_modification(){
    if (this.form_edit_product_modification.invalid) {
      Object.keys(this.form_edit_product_modification.controls).forEach((key: string) => {
        const control = this.form_edit_product_modification.get(key);
        if (control) {
          control.markAsTouched();
          control.markAsDirty();
        }
      });

      return;
    }

    this._modalController.dismiss(this.form_edit_product_modification.value, 'update')
  }

}
