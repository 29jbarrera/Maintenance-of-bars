import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { PrinterJob } from '../printer-jobs.type';
import { TicketPreviewComponent } from 'apps/app/src/app/components/ticket-preview/ticket-preview.component';

@Component({
  selector: 'app-modal-view-ticket',
  standalone: true,
  imports: [CommonModule, IonicModule, TicketPreviewComponent],
  templateUrl: './modal-view-ticket.component.html',
  styleUrl: './modal-view-ticket.component.scss',
})
export class ModalViewTicketComponent {
  @Input() lines!: any;

  constructor(private _modalController: ModalController) {}

  close_modal() {
    this._modalController.dismiss();
  }

  reprinter() {
    this._modalController.dismiss('', 'print');
  }

}
