import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ViewUserOrganizationAccess,
} from '../../../types';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-organization-with-access',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './organization-with-access-item.component.html',
  styleUrl: './organization-with-access-item.component.scss',
})
export class OrganizationWithAccessItemComponent {
  @Input() organization_access!: ViewUserOrganizationAccess;
  @Input() checked_access: boolean = false;
  @Output() change_access_to_organization = new EventEmitter<ViewUserOrganizationAccess>();
  @Output() delete_access_to_organization = new EventEmitter<ViewUserOrganizationAccess>();
}
