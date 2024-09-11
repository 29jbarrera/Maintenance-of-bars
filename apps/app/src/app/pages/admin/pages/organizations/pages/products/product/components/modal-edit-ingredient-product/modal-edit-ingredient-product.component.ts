import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ingredientProductForm, ProductListIngredient } from '../../types';
import { InputTextModule } from 'primeng/inputtext';
import { getFormErrorMessage, isFormFieldInvalid } from '@komandero/web-share';

@Component({
  selector: 'app-modal-edit-ingredient-product',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule, InputTextModule],
  templateUrl: './modal-edit-ingredient-product.component.html',
  styleUrl: './modal-edit-ingredient-product.component.scss',
})
export class ModalEditIngredientProductComponent {

  @Input() ingredient!: ProductListIngredient;
  @Input() form_edit_ingredient_product = ingredientProductForm();

  constructor(private _modalController: ModalController) {}

  close_modal() {
    this._modalController.dismiss();
  }

  isFormFieldInvalid(name: string) {
    return isFormFieldInvalid(name, this.form_edit_ingredient_product);
  }

  getFormErrorMessage(name: string) {
    return getFormErrorMessage(name, this.form_edit_ingredient_product);
  }

  update_ingredient_product(){

    if (this.form_edit_ingredient_product.invalid) {
      Object.keys(this.form_edit_ingredient_product.controls).forEach((key: string) => {
        const control = this.form_edit_ingredient_product.get(key);
        if (control) {
          control.markAsTouched();
          control.markAsDirty();
        }
      });

      return;
    }

    this._modalController.dismiss(this.form_edit_ingredient_product.value, 'update')
  }

}
