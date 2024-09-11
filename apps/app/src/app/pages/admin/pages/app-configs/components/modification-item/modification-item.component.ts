import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Modification } from '../../type';

@Component({
  selector: 'app-modification-item',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './modification-item.component.html',
  styleUrl: './modification-item.component.scss',
})
export class ModificationItemComponent {
  @Input() modification!: Modification;
  @Input() line: 'full' | 'none' = 'full';
  @Output() edit_product_modification = new EventEmitter<Modification>();
  @Output() confirm_delete = new EventEmitter<Modification>();
}
