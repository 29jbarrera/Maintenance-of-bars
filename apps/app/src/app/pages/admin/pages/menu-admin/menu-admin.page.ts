import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ItemMenuComponent } from './components/item-menu/item-menu.component';

@Component({
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, ItemMenuComponent],
  templateUrl: './menu-admin.page.html',
  styleUrl: './menu-admin.page.scss',
})
export class MenuAdminPage {
  public menu_items: any[] = [];
  public deployed_menu: boolean = true;
  public is_mode_desktop: boolean = true;

  constructor(private _router: Router, private _route: ActivatedRoute) {}

  ionViewWillEnter() {
    this.menu_items = [
      {
        label: 'Usuarios',
        icon: 'pi pi-user mr-2',
        routerLink: '/authenticated/admin/users',
        action: 'users',
      },
      {
        label: 'Organizaciones',
        icon: 'pi pi-building mr-2',
        routerLink: '/authenticated/admin/organizations',
        action: 'organizations',
      },
      {
        label: 'Configuración Local Impresora',
        icon: 'pi pi-print mr-2',
        routerLink: '/authenticated/admin/local-configuration-printers',
        action: 'local-configuration-printers',
      },
      {
        label: 'Configuraciones',
        icon: 'pi pi-cog mr-2',
        routerLink: '/authenticated/admin/app-configs',
        action: 'app-configs',
      },
    ];

    this.check_is_desktop();
  }

  go_to(path: string) {
    
    this._router.navigate(['authenticated', 'admin', ...path.split('/')]);
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

  checkRoute(item: any) {
    return item.routerLink === this._router.url;
  }

  backdrop() {
    if (this.deployed_menu) {
      this.handleMenu();
    }
  }

  handleMenu() {
    const menu = document.getElementById('app-sidebar');

    if (!menu) return;

    this.deployed_menu = !this.deployed_menu;
    menu.classList.toggle('hidden', !this.deployed_menu);
  }
}
