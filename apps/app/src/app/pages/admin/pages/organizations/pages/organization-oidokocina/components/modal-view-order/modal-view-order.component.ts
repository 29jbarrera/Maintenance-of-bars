import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActionSheetController,
  IonicModule,
  ModalController,
} from '@ionic/angular';
import { TagModule } from 'primeng/tag';
import { ModalAcceptOrderComponent } from '../modal-accept-order/modal-accept-order.component';
import { clientOrganizationTrpc } from '@komandero/clientTRPC';
import {
  get_method_delivery,
  OK_PEDIDO_UNO,
} from '@komandero/commons';
import { TableProductsOrderComponent } from './table-products-order/table-products-order.component';
import { CardInfoOrderComponent } from './card-info-order/card-info-order.component';

@Component({
  selector: 'app-modal-view-order',
  standalone: true,
  imports: [CommonModule, IonicModule, TagModule, TableProductsOrderComponent, CardInfoOrderComponent],
  templateUrl: './modal-view-order.component.html',
  styleUrl: './modal-view-order.component.scss',
})
export class ModalViewOrderComponent {
  @Input() order_id: number = 0;
  @Input() organization_id: string = '';

  public order: OK_PEDIDO_UNO | undefined;

  constructor(
    private _modalController: ModalController,
    private _actionSheetCtrl: ActionSheetController
  ) {}

  ionViewWillEnter() {
    this.load_order();
  }

  async load_order() {
    const get_un_pedido = {
      id: this.order_id.toString(),
      organization_id: this.organization_id,
    };

    try {
      const response =
        await clientOrganizationTrpc.oidokocina.get_un_pedido.mutate(
          get_un_pedido
        );
      this.order = response as OK_PEDIDO_UNO;
    } catch (error) {}
  }

  close() {
    this._modalController.dismiss();
  }

  // Método Envío (RECOGEN o DOMICILIO)
  get_method_delivery(type: string) {
    return get_method_delivery(type);
  }

  // Texto para Aceptar o Preparado
  text_accept_or_order_prepared() {
    return this.order?.pedido.estado.id === 1
      ? {
          icon: 'checkmark-circle',
          text: 'Aceptar',
        }
      : {
          icon: 'checkmark-done-circle',
          text: 'Preparado',
        };
  }

  // Ocultar opcion de Aceptar o Preparado para otros estados
  disable_accept_or_confirm() {
    return (
      this.order?.pedido.estado.id !== 1 && this.order?.pedido.estado.id !== 2
    );
  }

  // Aceptar Pedido o Pedido Preparado
  accept_or_confirm() {
    this.order?.pedido.estado.id === 1
      ? this.accept_order()
      : this.order_prepared();
  }

  // TODO: Cambiar tiempoestimadoest
  // TODO: Cambiar Estado pedido a Aceptado
  async accept_order() {
    if (!this.order) return;

    const delivery = this.get_method_delivery(this.order.pedido.formaentrega);
    const tiempoestimado = this.order.pedido.tiempoestimado;

    const modal = await this._modalController.create({
      component: ModalAcceptOrderComponent,
      backdropDismiss: false,
      componentProps: {
        delivery,
        tiempoestimado,
      },
      mode: 'ios',
      cssClass: 'fullscreen',
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role !== 'create') return;

    console.error(
      `TODO: Cambiar tiempoestimadoest a tiempoestimadoest seleccionado ${data} y Estado a Aceptado`
    );

    this._modalController.dismiss();
  }

  // TODO: Cambiar estado del pedido a preparado
  async order_prepared() {
    const confirm_order_prepared = await this._actionSheetCtrl.create({
      header: 'Confirmar ',
      mode: 'ios',
      buttons: [
        {
          icon: 'checkmark-circle',
          text: 'Confirmar',
          role: 'confirm',
        },
        {
          icon: 'close',
          text: 'Cancelar',
          role: 'cancel',
        },
      ],
    });

    await confirm_order_prepared.present();

    const { role } = await confirm_order_prepared.onWillDismiss();

    if (role === 'cancel') return;

    console.error(`TODO: Cambiar estado del pedido a preparado`);

    this._modalController.dismiss();
  }

  // TODO: Rechazar Orden
  async reject_order() {
    const confirm_reject_order = await this._actionSheetCtrl.create({
      header: 'Confirmar ',
      mode: 'ios',
      buttons: [
        {
          icon: 'trash',
          text: 'Confirmar',
          role: 'confirm',
        },
        {
          icon: 'close',
          text: 'Cancelar',
          role: 'cancel',
        },
      ],
    });

    await confirm_reject_order.present();

    const { role } = await confirm_reject_order.onWillDismiss();

    if (role === 'cancel') return;

    console.error(`TODO: Rechazar Orden`);
    this._modalController.dismiss();
  }

  // TODO: Imprimir
  print() {
    console.error('TODO: Imprimir');
  }
}
