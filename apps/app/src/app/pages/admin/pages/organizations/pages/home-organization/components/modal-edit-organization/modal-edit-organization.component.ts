import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationForm } from '../../types';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { getFormErrorMessage, isFormFieldInvalid } from '@komandero/web-share';

@Component({
  selector: 'app-modal-edit-organization',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
  ],
  templateUrl: './modal-edit-organization.component.html',
  styleUrl: './modal-edit-organization.component.scss',
})
export class ModalEditOrganizationComponent {
  @Input() public organization_form = OrganizationForm();

  constructor(private _modalController: ModalController) {}

  close() {
    this._modalController.dismiss();
  }

  updateOrganization() {
    if (!this.organization_form.valid) {
      Object.keys(this.organization_form.controls).forEach(
        (key: string) => {
          const control = this.organization_form.get(key);
          if (control) {
            control.markAsTouched();
            control.markAsDirty();
          }
        }
      );
      return;
    }

    this._modalController.dismiss(this.organization_form.value, 'update');
  }

  isFormFieldInvalid(name: string) {
    return isFormFieldInvalid(name, this.organization_form);
  }

  getFormErrorMessage(name: string) {
    return getFormErrorMessage(name, this.organization_form);
  }

}
