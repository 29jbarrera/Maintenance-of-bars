import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Cliente, Clientes, client_form } from './type';
import {
  IonicModule,
  ModalController,
  ActionSheetController,
  LoadingController,
} from '@ionic/angular';
import { clientOrganizationTrpc } from '@komandero/clientTRPC';
import { get_organization_id } from '@komandero/utils';

import { FilterClientesPipe } from './client.pipe';

import { HeaderAppComponent } from '@komandero/web-share';
import { ModalClientComponent } from './components/modal-client.component';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    ToastModule,
    ReactiveFormsModule,
    TableModule,
    HeaderAppComponent,
    FilterClientesPipe,
  ],
  templateUrl: './client.page.html',
  providers: [MessageService],
})
export class ClientPage {
  public clientes: Clientes = [];
  public clientes_reset: Clientes = [];
  public search_term: string = '';
  public organization_name: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _messageService: MessageService,
    private loadingController: LoadingController,
    private modalController: ModalController,
    private actionSheetCtrl: ActionSheetController
  ) {}

  ionViewWillEnter() {
    this.load_clientes();
  }

  private get_organization_id() {
    return get_organization_id(this._route);
  }

  async get_organization_name(id: string) {
    try {
      const organization =
        await clientOrganizationTrpc.get_organization_name.query({ id });

      this.organization_name = organization?.name;
    } catch (error) {}
  }

  async load_clientes() {
    const organization_id = this.get_organization_id();

    const { clients } = await clientOrganizationTrpc.clients.get_all.mutate({
      organization_id,
    });
    console.log(clients);
    this.clientes = clients;

    this.get_organization_name(organization_id);
  }

  search_clientes(event: any) {
    this.search_term = event.target.value.toLowerCase();
  }

  async view_modal_client(cliente: Cliente | null) {
    const form_cliente = client_form();
    let title = '';
    let action = 'add';
    let id = cliente?.id as string;
    if (cliente) {
      form_cliente.patchValue({
        name: cliente.name,
        nif: cliente.nif,
        phone: cliente.phone,
        email: cliente.email,
        address: cliente.address,
        cp: cliente.cp,
        locality: cliente.locality,
        province: cliente.province,
      });
      title = 'Editar cliente';
      action = 'edit';
    } else {
      title = 'Añadir nuevo cliente';
    }
    const modal = await this.modalController.create({
      component: ModalClientComponent,
      backdropDismiss: false,
      componentProps: {
        form_cliente,
        title,
        id,
        action,
        organization_id: this.get_organization_id(),
      },
      mode: 'ios',
    });
    await modal.present();
    const { data, role } = await modal.onWillDismiss();

    if (role === 'edit') {
      await this.edit_cliente(data, id);
    }

    if (role === 'add') {
      await this.create_cliente(data);
    }
    this.load_clientes();
  }

  async create_cliente(data: any) {
    const loading = await this.loadingController.create({
      message: 'Creando cliente...',
      duration: 0,
    });

    await loading.present();
    try {
      await clientOrganizationTrpc.clients.create.mutate({
        name: data.name,
        nif: data.nif,
        email: data.email,
        phone: data.phone,
        address: data.address,
        cp: data.cp,
        locality: data.locality,
        province: data.province,
        organization_id: this.get_organization_id(),
      });
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

  async edit_cliente(data: any, id: string) {
    const loading = await this.loadingController.create({
      message: 'Guardando cliente...',
      duration: 0,
    });

    await loading.present();
    try {
      await clientOrganizationTrpc.clients.edit.mutate({
        id,
        name: data.name,
        nif: data.nif,
        phone: data.phone,
        email: data.email,
        address: data.address,
        cp: data.cp,
        locality: data.locality,
        province: data.province,
        organization_id: this.get_organization_id(),
      });
      this._messageService.add({
        severity: 'success',
        summary: 'Completado',
        detail: 'Cliente editado',
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

  async delete_cliente(cliente: Cliente) {
    const confirm_delete_product_size = await this.actionSheetCtrl.create({
      header: 'Eliminar cliente',
      mode: 'ios',
      buttons: [
        {
          icon: 'trash',
          text: 'Confirmar',
          role: 'confirm',
          handler: () => {
            this.confirmar_delete_cliente(cliente);
          },
        },
        {
          icon: 'close',
          text: 'Cancelar',
          role: 'cancel',
        },
      ],
    });
    await confirm_delete_product_size.present();
  }

  async confirmar_delete_cliente(cliente: Cliente) {
    const loading = await this.loadingController.create({
      message: 'Eliminando cliente...',
      duration: 0,
    });

    await loading.present();

    try {
      await clientOrganizationTrpc.clients.delete.mutate({
        id: cliente.id,
        organization_id: this.get_organization_id(),
      });
      this.load_clientes();
      this._messageService.add({
        severity: 'success',
        summary: 'Completado',
        detail: 'cliente eliminado',
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

  closeModal() {
    this.modalController.dismiss();
  }

  goBack() {
    this._router.navigate([
      'authenticated',
      'admin',
      'organizations',
      this.get_organization_id(),
    ]);
  }
}
