import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Group, GroupSelected } from '../../type';

@Component({
  selector: 'app-group-item',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './group-item.component.html',
  styleUrl: './group-item.component.scss',
})
export class GroupItemComponent {
  @Input() group!: Group;
  @Input() line: 'full' | 'none' = 'full';
  @Input() group_selected!: GroupSelected;
  @Output() load_product_modifications = new EventEmitter<GroupSelected>();
  @Output() modification_group = new EventEmitter<Group>();
}
