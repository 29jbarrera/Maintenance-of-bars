import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { OrganizationListItem } from '../../types';

@Component({
  selector: 'app-organization-item',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './organization-item.component.html',
  styleUrl: './organization-item.component.scss',
})
export class OrganizationItemComponent {

  @Input() organization!: OrganizationListItem;
  @Input() line: 'full' | 'none' = 'full';
  @Output() view_organization = new EventEmitter<OrganizationListItem>();
}
