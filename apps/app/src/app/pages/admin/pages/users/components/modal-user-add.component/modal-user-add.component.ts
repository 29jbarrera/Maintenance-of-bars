import { ChangeDetectorRef, Component, Input } from '@angular/core';
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
  createUserForm,
} from '../../types';
import { clientAdminTrpc } from '@komandero/clientTRPC';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-modal-user-add',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
  ],
  templateUrl: './modal-user-add.component.html',
  styleUrl: './modal-user-add.component.scss',
  providers: [MessageService],
})
export class ModalUserAddComponent {
  @Input() user!: ViewUserUser;
  @Input() organizations_have_access: ViewUserOrganizationsHaveAccess = [];

  public form_add_user = createUserForm();

  constructor(
    public modalController: ModalController,
    private _messageService: MessageService,
    public changeDetector: ChangeDetectorRef
  ) {}

  async addNewUser() {
    if (!this.form_add_user.valid) return;

    const newUser = this.form_add_user.value;

    try {
      const { displayName, email, password } = newUser;
      await clientAdminTrpc.users.create_user.mutate({
        displayName,
        email,
        password,
      });

      this._messageService.add({
        severity: 'success',
        summary: 'Completado',
        detail: 'Organización añadida',
      });
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
}
