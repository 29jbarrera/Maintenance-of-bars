import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-card-button-time',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './card-button-time.component.html',
  styleUrl: './card-button-time.component.scss',
})
export class CardButtonTimeComponent {

  @Input() time: number = 0;
  @Input() style: 'bg-primary' | 'surface-400' = 'bg-primary';

  @Output() change_time = new EventEmitter<number>();


}
