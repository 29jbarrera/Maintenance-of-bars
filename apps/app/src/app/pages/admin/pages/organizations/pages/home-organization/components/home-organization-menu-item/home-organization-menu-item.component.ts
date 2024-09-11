import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ModuleItem } from '../../types';
import { getIconOfModuleHomeAdmin } from '@komandero/commons';

@Component({
  selector: 'app-home-organization-menu-item',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './home-organization-menu-item.component.html',
  styleUrl: './home-organization-menu-item.component.scss',
})
export class HomeOrganizationMenuItemComponent {

  @Input() menu_item!: ModuleItem;
  @Output() navigate_to = new EventEmitter<string>();

  constructor(){}

  getIcon(name_path: string) {
    return getIconOfModuleHomeAdmin(name_path);
  }


}
