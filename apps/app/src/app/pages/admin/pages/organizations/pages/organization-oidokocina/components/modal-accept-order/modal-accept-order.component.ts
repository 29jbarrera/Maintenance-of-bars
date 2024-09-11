import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { CardButtonTimeComponent } from './card-button-time/card-button-time.component';

@Component({
  selector: 'app-modal-accept-order',
  standalone: true,
  imports: [CommonModule, IonicModule, CardButtonTimeComponent],
  templateUrl: './modal-accept-order.component.html',
  styleUrl: './modal-accept-order.component.scss',
})
export class ModalAcceptOrderComponent {
  @Input() delivery: string = '';
  @Input() tiempoestimado: number = 0;

  public estimated_times: any = [
    5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 75, 90,
  ];

  constructor(private _modalController: ModalController) {}

  close() {
    this._modalController.dismiss();
  }

  change_time(time: number) {
    this.tiempoestimado = time;
  }

  accept() {
    this._modalController.dismiss(this.tiempoestimado, 'create');
  }
}
