import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  IonicModule,
  ModalController,
  ItemReorderEventDetail,
  ActionSheetController,
  LoadingController,
} from '@ionic/angular';
import { clientOrganizationTrpc } from '@komandero/clientTRPC';
import { get_organization_id } from '@komandero/utils';
import {
  ProductsList,
  ProductsListItem,
  productSizeForm,
  product_size,
} from './type';

import { ModalAddProductSizeComponent } from './components/modal_add_or_edit_product_size/modal-add-or-edit-product-size.component';
import { HeaderAppComponent } from '@komandero/web-share';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-sizes-admin',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    HeaderAppComponent,
    ToastModule,
  ],
  templateUrl: './product-sizes-admin.page.html',
  styleUrl: './product-sizes-admin.page.scss',
  providers: [MessageService],
})
export class ProductSizesAdminPage {
  public product_size: ProductsList = [];
  public product_size_reset: ProductsList = [];
  public order_product_size: boolean = false;
  public organization_name: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private loadingController: LoadingController,
    private _messageService: MessageService,
    private modalController: ModalController,
    private actionSheetCtrl: ActionSheetController
  ) {}

  ionViewWillEnter() {
    this.load_product_size();
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

  async load_product_size() {
    const organization_id = this.get_organization_id();

    const { product_sizes } =
      await clientOrganizationTrpc.product_size.get_all.mutate({
        organization_id,
      });
    this.product_size = product_sizes;
    this.product_size_reset = JSON.parse(JSON.stringify(product_sizes));

    this.get_organization_name(organization_id);
  }

  async delete_product_size(size: product_size) {
    const confirm_delete_product_size = await this.actionSheetCtrl.create({
      header: 'Eliminar tamaño',
      mode: 'ios',
      buttons: [
        {
          icon: 'trash',
          text: 'Confirmar',
          role: 'confirm',
          handler: () => {
            this.confirm_delete_product_size(size);
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

  async confirm_delete_product_size(size: product_size) {
    const loading = await this.loadingController.create({
      message: 'Eliminando tamaño...',
      duration: 0,
    });

    await loading.present();

    try {
      await clientOrganizationTrpc.product_size.delete.mutate({
        id: size.id,
        organization_id: this.get_organization_id(),
      });
      this.load_product_size();
      this._messageService.add({
        severity: 'success',
        summary: 'Completado',
        detail: 'Tamaño eliminado',
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

  handle_reorder(ev: CustomEvent<ItemReorderEventDetail>) {
    const from = ev.detail.from;
    const to = ev.detail.to;

    const item_to_move = this.product_size.splice(from, 1)[0];
    this.product_size.splice(to, 0, item_to_move);

    this.update_order();

    ev.detail.complete();
  }

  update_order() {
    this.product_size.forEach((size, index) => {
      size.qr_o = index;
    });
  }

  toggle_reorder() {
    this.order_product_size = !this.order_product_size;
  }

  reset_order() {
    this.product_size = [];
    try {
      this.product_size = this.product_size_reset.map((p) => {
        return {
          ...p,
        };
      });
      this._messageService.add({
        severity: 'success',
        summary: 'Completado',
        detail: 'Orden restablecido',
      });
    } catch (error) {
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
      });
    }
  }

  async save_order() {
    this.product_size.forEach((product_size, index) => {
      product_size.qr_o = index;
    });

    const update = {
      organization_id: this.get_organization_id(),
      product_size: this.product_size.map((p) => {
        return {
          id: p.id,
          qr_o: p.qr_o,
        };
      }),
    };

    try {
      const response =
        await clientOrganizationTrpc.product_size.save_order_category.mutate(
          update
        );
      if (!response) return;
      this._messageService.add({
        severity: 'success',
        summary: 'Completado',
        detail: 'Orden actualizado',
      });
    } catch (error) {
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
      });
    }
  }

  async view_modal_product_size(product_size: ProductsListItem | null) {
    const form_product_size = productSizeForm();
    let title_modal = '';
    let action = 'add';
    let id = product_size?.id as string;
    if (product_size) {
      form_product_size.patchValue({
        name: product_size.name,
        qr_o: product_size.qr_o,
      });
      title_modal = 'Editar tamaño';
      action = 'edit';
    } else {
      title_modal = 'Añadir nuevo tamaño';
    }
    const modal = await this.modalController.create({
      component: ModalAddProductSizeComponent,
      backdropDismiss: false,
      componentProps: {
        form_product_size,
        title_modal,
        organization_id: this.get_organization_id(),
        id,
        action,
      },
      mode: 'ios',
    });
    await modal.present();
    const { data, role } = await modal.onWillDismiss();

    if (role === 'edit') {
      await this.edit_product_size(data, id);
    }

    if (role === 'add') {
      await this.create_product_size(data);
    }
    this.load_product_size();
  }

  async create_product_size(data: any) {
    const loading = await this.loadingController.create({
      message: 'Creando tamaño de producto...',
      duration: 0,
    });

    await loading.present();
    try {
      await clientOrganizationTrpc.product_size.create.mutate({
        name: data.name,
        qr_o: Number(data.qr_o),
        organization_id: this.get_organization_id(),
      });
      this._messageService.add({
        severity: 'success',
        summary: 'Completado',
        detail: 'Tamaño creado',
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

  async edit_product_size(data: any, id: string) {
    const loading = await this.loadingController.create({
      message: 'Guardando tamaño de producto...',
      duration: 0,
    });

    await loading.present();
    try {
      await clientOrganizationTrpc.product_size.edit.mutate({
        name: data.name,
        id,
        organization_id: this.get_organization_id(),
        qr_o: Number(data.qr_o),
      });
      this._messageService.add({
        severity: 'success',
        summary: 'Completado',
        detail: 'Tamaño actualizado',
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

  goBack() {
    this._router.navigate([
      'authenticated',
      'admin',
      'organizations',
      this.get_organization_id(),
    ]);
  }
}
