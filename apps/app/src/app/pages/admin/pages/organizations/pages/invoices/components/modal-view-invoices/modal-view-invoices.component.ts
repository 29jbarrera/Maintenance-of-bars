import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonicModule,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { InvoiceById } from '../../type';
import { ModalAddClientComponent } from '../modal-add-client/modal-add-client.component';
import { clientOrganizationTrpc } from '@komandero/clientTRPC';
import { Clientes } from '../../../client/type';
import { cent_to_eur } from '@komandero/commons';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CentToEurPipe } from '@komandero/web-share';

@Component({
  selector: 'app-modal-view-invoices',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    AccordionModule,
    ToastModule,
    CentToEurPipe,
  ],
  templateUrl: './modal-view-invoices.component.html',
  styleUrl: './modal-view-invoices.component.scss',
  providers: [MessageService],
})
export class ModalViewInvoicesComponent {
  @Input() invoice!: InvoiceById;
  public clientes: Clientes = [];

  constructor(
    private _modalController: ModalController,
    private loadingController: LoadingController,
    private _messageService: MessageService
  ) {}

  async loadClients(): Promise<Clientes> {
    const { clients } = await clientOrganizationTrpc.clients.get_all.mutate({
      organization_id: this.invoice.organization_id,
    });
    return clients;
  }

  async view_modal_add_client() {
    const clients = await this.loadClients();

    const modal = await this._modalController.create({
      component: ModalAddClientComponent,
      backdropDismiss: false,
      componentProps: {
        organization_id: this.invoice.organization_id,
        clients,
      },
      mode: 'ios',
    });

    await modal.present();

    const { data: organization_client_id, role } = await modal.onWillDismiss();

    if (role !== 'create') return;

    await this.update_invoice(organization_client_id);
  }

  async update_invoice(organization_client_id: string) {
    const loading = await this.loadingController.create({
      message: 'Añadiendo cliente...',
      duration: 0,
    });

    await loading.present();

    const update_invoice = {
      id: this.invoice.id,
      organization_client_id,
    };

    try {
      const response =
        await clientOrganizationTrpc.invoice.add_client_to_invoice.mutate(
          update_invoice
        );

      this.invoice = {
        ...this.invoice,
        organization_client: response.update_invoice.organization_client,
        organization_client_id: response.update_invoice.organization_client_id,
      };

      this._messageService.add({
        severity: 'success',
        summary: 'Completado',
        detail: 'Cliente añadido',
      });
    } catch (error) {
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
      });
    }
    await loading.dismiss();
  }

  close_modal() {
    this._modalController.dismiss();
  }
}
