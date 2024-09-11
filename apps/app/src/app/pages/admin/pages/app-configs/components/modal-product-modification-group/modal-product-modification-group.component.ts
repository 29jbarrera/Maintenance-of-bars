import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { getFormErrorMessage, isFormFieldInvalid } from '@komandero/web-share';
import { productModifcationGroupForm } from '../../type';

@Component({
  selector: 'app-modal-product-modification-group',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule, FormsModule, InputTextModule],
  templateUrl: './modal-product-modification-group.component.html',
  styleUrl: './modal-product-modification-group.component.scss',
})
export class ModalProductModificationGroupComponent {

  @Input() form_modification_group =  productModifcationGroupForm();
  public group_name: string = '';

  ionViewWillEnter(){
    this.group_name = this.form_modification_group.get('name')?.value;
    this.form_modification_group.get('id')?.disable();
  }

  constructor(private _modalController: ModalController){}

  close() {
    this._modalController.dismiss();
  }

  isFormFieldInvalid(name: string) {
    return isFormFieldInvalid(name, this.form_modification_group);
  }

  getFormErrorMessage(name: string) {
    return getFormErrorMessage(name, this.form_modification_group);
  }


  save(){
    if (!this.form_modification_group.valid) {
      Object.keys(this.form_modification_group.controls).forEach((key: string) => {
        const control = this.form_modification_group.get(key);
        if (control) {
          control.markAsTouched();
          control.markAsDirty();
        }
      });
      return;
    }

    this._modalController.dismiss(this.form_modification_group.value, 'create')
  }

}
