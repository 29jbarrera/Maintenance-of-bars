import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActionSheetController,
  IonicModule,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  Organizations,
  ViewUserOrganizationAccess,
  ViewUserOrganizationsHaveAccess,
  ViewUserUser,
  editUserForm,
} from '../../types';
import { clientAdminTrpc } from '@komandero/clientTRPC';
import { ButtonModule } from 'primeng/button';
import { ModalOrganizationAddComponent } from '../modal-organization-add.component/modal-organization-add.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { getFormErrorMessage, isFormFieldInvalid } from '@komandero/web-share';
import { OrganizationWithAccessItemComponent } from './organization-with-access-item/organization-with-access-item.component';
import { NoResultsComponent } from 'apps/app/src/app/components/shared/no-results/no-results.component';

@Component({
  selector: 'app-modal-user-view',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    OrganizationWithAccessItemComponent,
    NoResultsComponent
  ],
  templateUrl: './modal-user-view.component.html',
  styleUrl: './modal-user-view.component.scss',
  providers: [MessageService],
})
export class ModalUserViewComponent {
  @Input() id: string = '';

  public user: ViewUserUser | undefined;
  public organizations_have_access: ViewUserOrganizationsHaveAccess = [];
  public form_edit_user = editUserForm();
  public loading: boolean = false;

  constructor(
    public modalController: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private _loadingController: LoadingController,
    private _messageService: MessageService
  ) {}

  ionViewWillEnter() {
    this.load_user_and_organizations();
  }

  async load_user_and_organizations() {
    this.loading = true;
    const loading = await this._loadingController.create({
      backdropDismiss: false,
      mode: 'ios',
      animated: true,
      spinner: 'dots',
      duration: 0,
    });

    await loading.present();
    try {
      const { organizations_have_access, user } =
        await clientAdminTrpc.users.view_user.query({ id: this.id });

      this.organizations_have_access = organizations_have_access.sort((a, b) =>
        a.organization.name.localeCompare(b.organization.name)
      );

      this.user = user;

      if (this.user) {
        this.form_edit_user.patchValue({
          id: this.user.id,
          uid: this.user.uid,
          email: this.user.email,
          displayName: this.user.displayName,
        });

        this.form_edit_user.get('id')?.disable();
        this.form_edit_user.get('uid')?.disable();
        this.form_edit_user.get('email')?.disable();
      }
    } catch (error) {}

    await loading.dismiss();
    this.loading = false;
  }

  getUserNameOrEmail() {
    return this.user?.displayName || this.user?.email;
  }

  async updateChanges() {
    if (!this.user) return;

    const displayName = this.form_edit_user.get('displayName')?.value;

    const data = {
      id: this.id,
      displayName,
    };

    try {
      const response = await clientAdminTrpc.users.edit_display_name.mutate(
        data
      );

      if (!response) return;

      this.user.displayName = displayName;

      this._messageService.add({
        severity: 'success',
        summary: 'Completado',
        detail: 'Cambios guardados',
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

  async change_access_to_organization(access: ViewUserOrganizationAccess) {
    const confirm_change_access = await this.actionSheetCtrl.create({
      header: 'Confirmar cambio de acceso',
      mode: 'ios',
      buttons: [
        {
          icon: 'code',
          text: 'Confirmar',
          role: 'confirm',
        },
        {
          icon: 'close',
          text: 'Cancelar',
          role: 'cancel',
        },
      ],
    });

    await confirm_change_access.present();

    const { role } = await confirm_change_access.onWillDismiss();

    if (role !== 'confirm') {
      this.organizations_have_access = this.organizations_have_access
        .map((_access: any) => {
          if (_access.o_id === access.o_id) {
            return { ..._access, disabled: access.disabled };
          }

          return _access;
        })
        .sort((a, b) => a.organization.name.localeCompare(b.organization.name));
      return;
    }
    this.confirm_change_access_to_organization(access);
  }

  async confirm_change_access_to_organization(
    access: ViewUserOrganizationAccess
  ) {
    const data = {
      u_id: access.u_id,
      o_id: access.o_id,
      disabled: !access.disabled,
    };

    try {
      await clientAdminTrpc.users.toggle_user_on_organization.mutate(data);

      this._messageService.add({
        severity: 'success',
        summary: 'Completado',
        detail: 'Cambios guardados',
      });
    } catch (error) {
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
      });
    }
  }

  async delete_access_to_organization(access: ViewUserOrganizationAccess) {
    const confirm_delete_access = await this.actionSheetCtrl.create({
      header: 'Eliminar Acceso',
      mode: 'ios',
      buttons: [
        {
          icon: 'trash',
          text: 'Confirmar',
          role: 'confirm',
        },
        {
          icon: 'close',
          text: 'Cancelar',
          role: 'cancel',
        },
      ],
    });

    await confirm_delete_access.present();

    const { role } = await confirm_delete_access.onWillDismiss();

    if (role !== 'confirm') return;

    try {
      const response =
        await clientAdminTrpc.users.remove_user_to_organization.mutate({
          u_id: access.u_id,
          o_id: access.o_id,
        });

      if (!response) return;

      this.organizations_have_access = this.organizations_have_access.filter(
        (_access: any) => _access.o_id !== access.o_id
      );

      this._messageService.add({
        severity: 'success',
        summary: 'Completado',
        detail: 'Cambios guardados',
      });
    } catch (error) {
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
      });
    }
  }

  filterOrganizations(
    organizations: Organizations,
    organizations_have_access: ViewUserOrganizationsHaveAccess
  ) {
    return organizations.filter(
      (org) =>
        !organizations_have_access.some(
          (access) => access.organization.id === org.id
        )
    );
  }

  async add_organizations_user() {
    const { organizations } =
      await clientAdminTrpc.users.get_organizations_to_add_user.query();

    const organizations_not_includes_to_user = this.filterOrganizations(
      organizations,
      this.organizations_have_access
    );

    const modal = await this.modalController.create({
      component: ModalOrganizationAddComponent,
      backdropDismiss: false,
      componentProps: {
        user: this.user,
        organizations: organizations_not_includes_to_user,
      },
      mode: 'ios',
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role !== 'create') return;

    try {
      const { add_organization_to_user } =
        await clientAdminTrpc.users.add_user_to_organization.mutate({
          o_id: data,
          u_id: this.id,
        });

      this.organizations_have_access.push(add_organization_to_user);

      this.organizations_have_access = this.organizations_have_access.sort(
        (a, b) => a.organization.name.localeCompare(b.organization.name)
      );

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

  getChecked(access: ViewUserOrganizationAccess['disabled']) {
    return !access;
  }

  isFormFieldInvalid(name: string) {
    return isFormFieldInvalid(name, this.form_edit_user);
  }

  getFormErrorMessage(name: string) {
    return getFormErrorMessage(name, this.form_edit_user);
  }
}
