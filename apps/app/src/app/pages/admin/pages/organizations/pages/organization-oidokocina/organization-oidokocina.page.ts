import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonicModule,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { get_organization_id } from '@komandero/utils';
import { HeaderAppComponent } from '@komandero/web-share';
import { clientOrganizationTrpc } from '@komandero/clientTRPC';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { OrderFilterComponent } from './components/orders-filter/orders-filter.component';
import { ModalViewOrderComponent } from './components/modal-view-order/modal-view-order.component';
import { FilterOrganizationOidokocina } from './organization-oidokocina.pipe';
import {
  FILTER_PEDIDOS,
  format_price_amount,
  get_method_delivery,
  get_severity_status,
  get_who_delivery,
  initialization_filters,
  OK_PEDIDO_BODY,
  OK_TYPE_OF_STATE,
  Pedido,
} from '@komandero/commons';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    HeaderAppComponent,
    TableModule,
    TagModule,
    OrderFilterComponent,
    FilterOrganizationOidokocina,
    InputTextareaModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './organization-oidokocina.page.html',
  styleUrl: './organization-oidokocina.page.scss',
})
export class OrganizationOidokocinaPage {
  public orders: Pedido[] = [];
  public organization_name: string = '';
  public search_term = '';
  public filters: FILTER_PEDIDOS = this.init_filters();

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private _modalController: ModalController,
    private _loadingController: LoadingController
  ) {}

  ionViewWillEnter() {
    this.get_organization_name(this.get_organization_id());
    this.filters = this.init_filters();
    this.loadOrders();
  }

  get_organization_id() {
    return get_organization_id(this._route);
  }

  async get_organization_name(id: string) {
    try {
      const organization =
        await clientOrganizationTrpc.get_organization_name.query({ id });

      this.organization_name = organization?.name || '';
    } catch (error) {}
  }

  async loadOrders() {
    const loading = await this._loadingController.create({
      backdropDismiss: false,
      mode: 'ios',
      duration: 0,
    });

    await loading.present();

    const get_pedidos: OK_PEDIDO_BODY = {
      fechaini: this.filters.from.toISOString(),
      fechafin: this.filters.to.toISOString(),
      estado: this.filters.status,
      formaPago: this.filters.payment_method,
      formaEntrega: this.filters.types_of_delivery,
      origen: this.filters.origin,
    };

    try {
      const { pedidos } =
        await clientOrganizationTrpc.oidokocina.get_pedidos.mutate(get_pedidos);

      this.orders = pedidos as Pedido[];

      this.orders = this.orders.sort((a: Pedido, b: Pedido) => {
        const date_compare =
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

        if (date_compare !== 0) {
          return date_compare;
        }

        return a.estado.id - b.estado.id;
      });
    } catch (error) {}

    await loading.dismiss();
  }

  init_filters() {
    return initialization_filters();
  }

  onRowSelect(event: any) {
    if (!event) return;

    this.view_order(event.data.id);
  }

  async view_order(order_id: Pedido['id']) {
    const modal = await this._modalController.create({
      component: ModalViewOrderComponent,
      componentProps: {
        order_id,
        organization_id: this.get_organization_id(),
      },
      backdropDismiss: false,
      mode: 'ios',
      cssClass: 'fullscreen',
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();
  }

  apply_filter_data(filters: FILTER_PEDIDOS) {
    this.filters = filters;
    this.loadOrders();
  }

  get_severity_status(code: OK_TYPE_OF_STATE) {
    return get_severity_status(code) as any;
  }

  get_method_delivery(type: string) {
    return get_method_delivery(type);
  }

  get_who_delivery(delivery: string) {
    return get_who_delivery(delivery);
  }

  format_price(amount: number): string {
    return format_price_amount(amount);
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
