import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-pill-checkbox-component',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './pill-checkbox-component.component.html',
  styleUrl: './pill-checkbox-component.component.scss',
})
export class PillCheckboxComponent {

  @Input() is_active: boolean = false;
  @Input() name: string = '';
  @Input() item: any;
  @Output() add_or_remove: EventEmitter<any> = new EventEmitter<any>();

}
