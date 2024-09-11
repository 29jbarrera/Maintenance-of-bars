import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { productModifcationForm } from '../../type';
import { getFormErrorMessage, isFormFieldInvalid } from '@komandero/web-share';
import { clientAdminTrpc } from '@komandero/clientTRPC';

@Component({
  selector: 'app-modal-product-modification',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
  ],
  templateUrl: './modal-product-modification.component.html',
  styleUrl: './modal-product-modification.component.scss',
})
export class ModalProductModificationComponent {
  @Input() form_modification_product = productModifcationForm();
  @Input() mode: 'Creando' | 'Editando' = 'Creando';
  public product_name: string = '';

  ionViewWillEnter() {
    this.product_name = this.form_modification_product.get('name')?.value;
  }

  constructor(private _modalController: ModalController) {}

  close() {
    this._modalController.dismiss();
  }

  isFormFieldInvalid(name: string) {
    return isFormFieldInvalid(name, this.form_modification_product);
  }

  getFormErrorMessage(name: string) {
    return getFormErrorMessage(name, this.form_modification_product);
  }

  check_form() {
    Object.values(this.form_modification_product.controls).forEach(control => {
      control.markAsTouched();
      control.markAsDirty();
    });
  }

  update() {
    if (!this.form_modification_product.valid) {
      this.check_form();
      return;
    }

    this._modalController.dismiss(
      this.form_modification_product.value,
      'update'
    );
  }

  async create() {

    const id = +this.form_modification_product.get('id')?.value;

    const exist =
      await clientAdminTrpc.app_configs.check_if_exist_product_id.mutate(id);

    if (exist) {
      this.form_modification_product.get('id')?.setErrors({ exist: true });
      this.check_form();
      return;
    }

    if (!this.form_modification_product.valid) {
      return;
    }

    this._modalController.dismiss(
      this.form_modification_product.value,
      'create'
    );
  }
}
