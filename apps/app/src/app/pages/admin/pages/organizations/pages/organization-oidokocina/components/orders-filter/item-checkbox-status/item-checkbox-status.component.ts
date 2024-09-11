import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { OK_TYPE_OF_STATE_SELECTION } from '@komandero/commons';

@Component({
  selector: 'app-item-checkbox-status',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './item-checkbox-status.component.html',
  styleUrl: './item-checkbox-status.component.scss',
})
export class ItemCheckboxStatusComponent {

  @Input() state!: OK_TYPE_OF_STATE_SELECTION
  @Input() checked: boolean = false;
  @Output() selectStatus = new EventEmitter();

  select_status(event: any, value: number){
    this.selectStatus.emit({event, value})
  }

}
