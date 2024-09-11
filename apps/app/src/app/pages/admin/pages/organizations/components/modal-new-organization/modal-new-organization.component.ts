import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonicModule,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  addOrganizationForm,
  ViewUserOrganizationsHaveAccess,
} from '../../types';
import { clientAdminTrpc } from '@komandero/clientTRPC';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { getFormErrorMessage, isFormFieldInvalid } from '@komandero/web-share';

@Component({
  selector: 'app-modal-new-organization',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
  ],
  templateUrl: './modal-new-organization.component.html',
  styleUrl: './modal-new-organization.component.scss',
  providers: [MessageService],
})
export class ModalNewOrganizationComponent {
  constructor(
    public modalController: ModalController,
    private loadingController: LoadingController,
    private _messageService: MessageService
  ) {}

  @Input() add_organizations: ViewUserOrganizationsHaveAccess | null = null;

  public form_add_organization = addOrganizationForm();

  async addOrganizations() {
    if (!this.form_add_organization.valid) return;

    const newOrganizationName = this.form_add_organization.value.name;

    const loading = await this.loadingController.create({
      message: 'Añadiendo organización...',
      backdropDismiss: false,
      duration: 0,
    });
    await loading.present();
    try {
      await clientAdminTrpc.organizations.create.mutate({
        name: newOrganizationName,
      });
      await loading.dismiss();

      this._messageService.add({
        severity: 'success',
        summary: 'Completado',
        detail: 'Organización añadida',
      });
      this.modalController.dismiss(null, 'created');
    } catch (error) {
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
      });
    }
  }

  closeModal() {
    this.modalController.dismiss();
  }

  isFormFieldInvalid(name: string) {
    return isFormFieldInvalid(name, this.form_add_organization);
  }

  getFormErrorMessage(name: string) {
    return getFormErrorMessage(name, this.form_add_organization);
  }
}
