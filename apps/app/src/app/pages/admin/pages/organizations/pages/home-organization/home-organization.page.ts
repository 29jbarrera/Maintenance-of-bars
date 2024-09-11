import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { get_organization_id } from '@komandero/utils';
import { clientAdminTrpc, clientOrganizationTrpc } from '@komandero/clientTRPC';
import { TableModule } from 'primeng/table';
import {
  UsersHaveAccess,
  OrganizationInfo,
  OrganizationForm,
  UserTable,
  ModuleItem,
  MODULES_ORGANIZATION,
} from './types';
import { ModalUserViewComponent } from '../../../users/components/modal-user-view.component/modal-user-view.component';
import { HeaderAppComponent } from '@komandero/web-share';
import { ModalEditOrganizationComponent } from './components/modal-edit-organization/modal-edit-organization.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { HomeOrganizationMenuItemComponent } from './components/home-organization-menu-item/home-organization-menu-item.component';

@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ToastModule,
    TableModule,
    HeaderAppComponent,
    HomeOrganizationMenuItemComponent
  ],
  templateUrl: './home-organization.page.html',
  styleUrl: './home-organization.page.scss',
  providers: [MessageService],
})
export class HomeOrganizationPage {
  public users_have_access: UsersHaveAccess = [];
  public organization: OrganizationInfo | undefined;
  public organization_form = OrganizationForm();
  public modules_organization: ModuleItem[] = MODULES_ORGANIZATION;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    public modalController: ModalController,
    private navCtrl: NavController,
    private _messageService: MessageService
  ) {}

  ionViewWillEnter() {
    this.load_users_have_access();
  }

  async edit_organization() {
    const modal = await this.modalController.create({
      component: ModalEditOrganizationComponent,
      backdropDismiss: false,
      componentProps: {
        organization_form: this.organization_form,
      },
      mode: 'ios',
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role !== 'update') return;

    try {
      const update =
        await clientAdminTrpc.organizations.edit_organization.mutate(data);

      if (!update) return;

      this.organization = update;

      this._messageService.add({
        severity: 'success',
        summary: 'Completado',
        detail: 'Datos actualizados',
      });
    } catch (error) {
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
      });
    }
  }

  private get_organization_id() {
    return get_organization_id(this._route);
  }

  async load_users_have_access() {
    const organizationId = this.get_organization_id();
    const { organization, users_have_access } =
      await clientOrganizationTrpc.view_organization.query({
        id: organizationId,
      });

    this.organization = organization;

    if (!this.organization) return;

    this.organization_form.patchValue({
      id: this.organization.id,
      name: this.organization.name,
      billing_identifier: this.organization.billing_identifier,
      billing_name: this.organization.billing_name,
      billing_address: this.organization.billing_address,
    });

    this.users_have_access = users_have_access;
  }

  async view_user(_user: UserTable) {
    const { organizations_have_access, user } =
      await clientAdminTrpc.users.view_user.query({ id: _user.id });

    organizations_have_access.sort((a, b) =>
      a.organization.name.localeCompare(b.organization.name)
    );

    const modal = await this.modalController.create({
      component: ModalUserViewComponent,
      backdropDismiss: false,
      componentProps: {
        organizations_have_access,
        user,
      },
      mode: 'ios',
    });

    await modal.present();
  }

  navigate_to(module: string) {
    this._router.navigate([
      'authenticated',
      'admin',
      'organizations',
      this.get_organization_id(),
      module,
    ]);
  }

  goBack() {
    this.navCtrl.navigateBack(['authenticated', 'admin', 'organizations']);
  }
}
