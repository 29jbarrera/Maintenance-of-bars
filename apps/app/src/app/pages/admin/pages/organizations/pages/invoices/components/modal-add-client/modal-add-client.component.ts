import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalController, IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Clientes } from '../../../client/type';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-modal-add-client',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
  ],
  templateUrl: './modal-add-client.component.html',
  styleUrl: './modal-add-client.component.scss',
})
export class ModalAddClientComponent {
  public client_selected!: any;
  @Input() clients: Clientes = [];
  @Input() organization_id: string = '';

  constructor(private modalController: ModalController) {}

  submit() {
    if (!this.client_selected) return;

    this.modalController.dismiss(this.client_selected, 'create');
  }

  close_modal() {
    this.modalController.dismiss();
  }
}
