import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { InputTextModule } from 'primeng/inputtext';
import { getFormErrorMessage, isFormFieldInvalid } from '@komandero/web-share';
import { client_form } from '../type';

@Component({
  selector: 'app-modal-client',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
  ],
  templateUrl: './modal-client.component.html',
  styleUrl: './modal-client.component.scss',
})
export class ModalClientComponent {
  @Input() form_client = client_form();
  @Input() title!: string;
  @Input() action = 'add';

  public form_cliente = client_form();

  constructor(public modalController: ModalController) {}

  submit() {
    if (this.action === 'edit') {
      this.edit_cliente();
    }
    this.add_cliente();
  }

  add_cliente() {
    if (this.form_cliente.invalid) return;

    this.modalController.dismiss(this.form_cliente.value, 'add');
  }

  edit_cliente() {
    if (this.form_cliente.invalid) return;

    this.modalController.dismiss(this.form_cliente.value, 'edit');
  }

  isFormFieldInvalid(name: string) {
    return isFormFieldInvalid(name, this.form_cliente);
  }

  getFormErrorMessage(name: string) {
    return getFormErrorMessage(name, this.form_cliente);
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
