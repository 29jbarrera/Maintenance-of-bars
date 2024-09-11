import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { get_organization_id } from '@komandero/utils';
import { getIconOfModuleHomeAdmin } from '@komandero/commons';
import { OrganizationMenuItemComponent } from './components/organization-menu-item/organization-menu-item.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    OrganizationMenuItemComponent,
  ],
  templateUrl: './menu-organization.page.html',
  styleUrl: './menu-organization.page.scss',
})
export class MenuOrganizationPage {
  public menu_items: any[] = [];
  public deployed_menu: boolean = true;

  constructor(private _router: Router, private _route: ActivatedRoute) {}

  private get_organization_id() {
    return get_organization_id(this._route);
  }

  ionViewWillEnter() {
    const organization_id = this.get_organization_id();

    this.menu_items = [
      {
        label: 'Accesos',
        routerLink: `/authenticated/admin/organizations/${organization_id}/access`,
        action: 'access',
      },
      {
        label: 'Encabezado Ticket',
        routerLink: `/authenticated/admin/organizations/${organization_id}/printer-config`,
        action: 'printer-config',
      },
      {
        label: 'Categorías Productos',
        routerLink: `/authenticated/admin/organizations/${organization_id}/product-categories`,
        action: 'product-categories',
      },
      {
        label: 'Tamaños Productos',
        routerLink: `/authenticated/admin/organizations/${organization_id}/product-sizes`,
        action: 'product-sizes',
      },
      {
        label: 'Productos',
        routerLink: `/authenticated/admin/organizations/${organization_id}/products`,
        action: 'products',
      },
      {
        label: 'Orden Productos',
        routerLink: `/authenticated/admin/organizations/${organization_id}/products-reorder`,
        action: 'products-reorder',
      },
      {
        label: 'Komanderos',
        routerLink: `/authenticated/admin/organizations/${organization_id}/commander`,
        action: 'commander',
      },
      {
        label: 'QR',
        routerLink: `/authenticated/admin/organizations/${organization_id}/qr`,
        action: 'qr',
      },
      {
        label: 'OidoKocina',
        routerLink: `/authenticated/admin/organizations/${organization_id}/oidokocina`,
        action: 'oidokocina',
      },
      {
        label: 'OidoKocina Organización',
        routerLink: `/authenticated/admin/organizations/${organization_id}/organization-oidokocina`,
        action: 'organization-oidokocina',
      },
      {
        label: 'Configuracion Mesas',
        routerLink: `/authenticated/admin/organizations/${organization_id}/eating-tables-configuration`,
        action: 'eating-tables-configuration',
      },
      {
        label: 'Pedidos',
        routerLink: `/authenticated/admin/organizations/${organization_id}/orders`,
        action: 'orders',
      },
      {
        label: 'Tickets',
        routerLink: `/authenticated/admin/organizations/${organization_id}/printer-jobs`,
        action: 'printer-jobs',
      },
      {
        label: 'Clientes',
        routerLink: `/authenticated/admin/organizations/${organization_id}/client`,
        action: 'client',
      },
      {
        label: 'Ingredientes',
        routerLink: `/authenticated/admin/organizations/${organization_id}/ingredients`,
        action: 'ingredients',
      },
      {
        label: 'Configuracion Masiva Ingredientes',
        routerLink: `/authenticated/admin/organizations/${organization_id}/ingredients-masive-config`,
        action: 'ingredients-masive-config',
      },
      {
        label: 'Configuracion Ingredientes Productos',
        routerLink: `/authenticated/admin/organizations/${organization_id}/configuration-ingredients-product`,
        action: 'configuration-ingredients-product',
      },
    ];

    setTimeout(() => {
      this.handleMenu();
    }, 50);
  }

  go_to(path: string) {
    const organization_id = this.get_organization_id();
    this._router.navigate([
      'authenticated',
      'admin',
      'organizations',
      organization_id,
      ...path.split('/'),
    ]);
    this.check_is_desktop();
  }

  check_is_desktop() {
    const width = window.innerWidth;

    if (width < 1920) {
      setTimeout(() => {
        this.handleMenu();
      }, 50);
    }

    return;
  }

  backdrop() {
    if (this.deployed_menu) {
      this.handleMenu();
    }
  }

  checkRoute(item: any) {
    return item.routerLink === this._router.url;
  }

  handleMenu() {
    const menu = document.getElementById('menu-organizations');

    if (!menu) {
      return;
    }

    this.deployed_menu = !this.deployed_menu;
    menu.classList.toggle('hidden', !this.deployed_menu);
  }

  goBack() {
    this._router.navigate(['authenticated', 'admin', 'organizations']);
  }
}
