import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { getIconOfModuleHomeAdmin } from '@komandero/commons';

@Component({
  selector: 'app-organization-menu-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './organization-menu-item.component.html',
  styleUrl: './organization-menu-item.component.scss',
})
export class OrganizationMenuItemComponent {
  @Input() item: any;
  @Output() go_to = new EventEmitter<string>();

  constructor(private _router: Router) {}

  checkRoute(item: any) {
    return item.routerLink === this._router.url;
  }

  getIcon(name_path: string) {
    return getIconOfModuleHomeAdmin(name_path);
  }
}
