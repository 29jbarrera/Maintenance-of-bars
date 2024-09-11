import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonicModule, ModalController } from '@ionic/angular';
import { clientOrganizationTrpc } from '@komandero/clientTRPC';

import { ModalNewOrganizationComponent } from './components/modal-new-organization/modal-new-organization.component';
import { FilterOrganizations } from './organizations.pipe';
import { HeaderAppComponent } from '@komandero/web-share';
import { OrganizationItemComponent } from './components/organization-item/organization-item.component';
import { OrganizationList, OrganizationListItem } from './types';

@Component({
  standalone: true,
  imports: [CommonModule, IonicModule, FilterOrganizations, HeaderAppComponent, OrganizationItemComponent],
  templateUrl: './organizations.page.html',
  styleUrl: './organizations.page.scss',
})
export class OrganizationsAdminPage {
  
  public organizations: OrganizationList = [];
  public search_term: string = '';

  constructor(
    private _router: Router,
    private modalController: ModalController
  ) {}
  ionViewWillEnter() {
    this.load_organizations();
  }

  private async load_organizations() {
    const { organizations } = await clientOrganizationTrpc.get_all.query();
    this.organizations = organizations.sort(
      (a: OrganizationListItem, b: OrganizationListItem) => {
        return a.name.localeCompare(b.name);
      }
    );
  }

  view_organization(organization: OrganizationListItem) {
    this._router.navigate([
      'authenticated',
      'admin',
      'organizations',
      organization.id,
    ]);
  }

  search_organization(event: any) {
    this.search_term = event.target.value.toLowerCase();
  }


  //TODO Crear Organizacion (Mover aqui funcionalidad Backend)
  async view_modal_add_NewOrganization() {
    const modal = await this.modalController.create({
      component: ModalNewOrganizationComponent,
      backdropDismiss: false,
      mode: 'ios',
    });

    await modal.present();

    const { role } = await modal.onWillDismiss();

    if (role === 'created') {
      this.load_organizations();
    }
  }
}
