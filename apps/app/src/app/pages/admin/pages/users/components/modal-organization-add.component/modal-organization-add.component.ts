import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActionSheetController,
  IonicModule,
  ModalController,
} from '@ionic/angular';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ViewUserOrganizationsHaveAccess,
  ViewUserUser,
  addOrganizationForm,
  Organizations,
} from '../../types';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { clientAdminTrpc } from '@komandero/clientTRPC';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-modal-organization-add',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    ToastModule,
  ],
  templateUrl: './modal-organization-add.component.html',
  styleUrl: './modal-organization-add.component.scss',
  providers: [MessageService],
})
export class ModalOrganizationAddComponent {
  @Input() user!: ViewUserUser;
  @Input() organizations: Organizations = [];

  public form_add_organization = addOrganizationForm();

  constructor(
    public modalController: ModalController,
    private _messageService: MessageService
  ) {}

  async addOrganizations() {
    if (!this.form_add_organization.valid) return;

    const organization_id = this.form_add_organization.value.id;

    this.modalController.dismiss(organization_id, 'create');
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
