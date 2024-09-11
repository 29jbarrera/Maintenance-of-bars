import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ingredientForm } from '../../types';
import { getFormErrorMessage, isFormFieldInvalid } from '@komandero/web-share';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-modal-create-or-update-ingredient',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule, InputTextModule],
  templateUrl: './modal-create-or-update-ingredient.component.html',
  styleUrl: './modal-create-or-update-ingredient.component.scss',
})
export class ModalCreateOrUpdateIngredientComponent {
  @Input() mode: 'creando' | 'editando' = 'creando';
  @Input() name: string = '';
  @Input() ingredient_form = ingredientForm();

  constructor(private _modalController: ModalController) {}

  isFormFieldInvalid(name: string) {
    return isFormFieldInvalid(name, this.ingredient_form);
  }

  getFormErrorMessage(name: string) {
    return getFormErrorMessage(name, this.ingredient_form);
  }

  close() {
    this._modalController.dismiss();
  }

  save() {
    if (!this.ingredient_form.valid) {
      Object.keys(this.ingredient_form.controls).forEach((key: string) => {
        const control = this.ingredient_form.get(key);
        if (control) {
          control.markAsTouched();
          control.markAsDirty();
        }
      });
      return;
    }

    const data = this.ingredient_form.value;

    if (this.mode === 'creando') {
      this._modalController.dismiss(data, 'create');
    } else {
      this._modalController.dismiss(data, 'update');
    }
  }
}
