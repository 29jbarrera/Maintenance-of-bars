import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { clientOrganizationTrpc } from '@komandero/clientTRPC';
import { get_organization_id } from '@komandero/utils';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, LoadingController } from '@ionic/angular';
import { UserHasAccessItemComponent } from './components/user-has-access-item/user-has-access-item.component';
import { AppRoles, OrganizationName, UsersHasAccess } from './types';
import { FilterAccess } from './access-admin.pipe';
import { HeaderAppComponent } from '@komandero/web-share';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { NoResultsComponent } from 'apps/app/src/app/components/shared/no-results/no-results.component';

@Component({
  selector: 'app-access-admin',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    UserHasAccessItemComponent,
    FilterAccess,
    HeaderAppComponent,
    ToastModule,
    NoResultsComponent,
  ],
  templateUrl: './access-admin.page.html',
  styleUrl: './access-admin.page.scss',
  providers: [MessageService],
})
export class AccessAdminPage {
  public users_has_access: UsersHasAccess = [];
  public search_term: string = '';
  public appRoles: AppRoles = [];
  public organization: OrganizationName | undefined;
  public loading: boolean = false;

  constructor(
    private readonly _router: Router,
    private _route: ActivatedRoute,
    private _messageService: MessageService,
    private _loadingController: LoadingController
  ) {}

  ionViewWillEnter() {
    this.load_access();
  }

  private get_organization_id() {
    return get_organization_id(this._route);
  }


  private async load_access() {
    this.loading = true;
    const loading = await this._loadingController.create({
      backdropDismiss: false,
      mode: 'ios',
      spinner: 'dots',
      duration: 0,
    });

    await loading.present();

    try {
      const organization_id = this.get_organization_id();
      const { app_roles, users_has_access, organization_name } =
        await clientOrganizationTrpc.access.get_all.mutate({
          organization_id,
        });

      this.users_has_access = users_has_access;
      this.appRoles = app_roles;
      this.organization = organization_name;
    } catch (error) {}

    await loading.dismiss();
    this.loading = false;
  }

  get_organization_name(){
    return this.organization?.name || '';
  }

  goBack() {
    this._router.navigate([
      'authenticated',
      'admin',
      'organizations',
      this.get_organization_id(),
    ]);
  }

  async toggleRole(data: any) {
    const { u_id, role } = data;
    const o_id = this.get_organization_id();

    const update_role = {
      u_id,
      o_id,
      role,
    };

    try {
      const response =
        await clientOrganizationTrpc.access.edit_access_role.mutate(
          update_role
        );

      if (!response) return;

      this.users_has_access = this.users_has_access.map((u) => {
        const existingRoleIndex =
          u.user.user_has_role_in_organization.findIndex(
            (_r) => _r.role === response.role && _r.u_id === response.u_id
          );

        if (existingRoleIndex === -1 && u.u_id === response.u_id) {
          u.user.user_has_role_in_organization.push(response);
        } else if (existingRoleIndex !== -1) {
          u.user.user_has_role_in_organization[existingRoleIndex] = {
            ...u.user.user_has_role_in_organization[existingRoleIndex],
            ...response,
          };
        }

        return u;
      });

      this._messageService.clear();

      this._messageService.add({
        severity: 'success',
        summary: 'Completado',
        detail: 'Actualizado',
      });
    } catch (error) {
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
      });
    }
  }

  search_users_by_email(event: any) {
    this.search_term = event.target.value.toLowerCase();
  }
}
