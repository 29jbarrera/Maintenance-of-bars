import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { get_organization_id } from '@komandero/utils';
import { IonicModule, ModalController } from '@ionic/angular';
import { clientOrganizationTrpc } from '@komandero/clientTRPC';
import {
  CartProducts,
  EatingTable,
  EatingTableGroups,
  EatingTables,
  Order,
  Orders,
  Users,
} from './type';
import { HeaderAppComponent } from '@komandero/web-share';
import { Table, TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { FilterBetweenDatesComponent } from '@komandero/web-share';
import { FilterCommonClass } from '@komandero/web-share';
import { ModalViewOrdersComponent } from './components/modal-view-orders/modal-view-orders.component';
import { ModalViewSelectedsOrdersComponent } from './components/modal-view-selecteds-orders/modal-view-selecteds-orders.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    HeaderAppComponent,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    TableModule,
    MultiSelectModule,
    CalendarModule,
    FilterBetweenDatesComponent,
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent extends FilterCommonClass {
  orders: Orders = [];
  eating_tables: EatingTables = [];
  eating_tables_groups: any = [];
  users: Users = [];
  public organization_name: any;

  public loading: boolean = false;

  @ViewChild('dt') override dt!: Table;

  selectedsOrders: Orders = [];

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private _modalController: ModalController
  ) {
    super();
  }

  override filtersBetweenDates(dates: any) {
    super.filtersBetweenDates(dates);
  }

  override cleanFilterDates() {
    super.cleanFilterDates();
  }

  get_organization_id() {
    return get_organization_id(this._route);
  }

  ionViewWillEnter() {
    this.load_orders();
  }

  async get_organization_name(id: string) {
    try {
      const organization =
        await clientOrganizationTrpc.get_organization_name.query({ id });

      this.organization_name = organization?.name;
    } catch (error) {}
  }

  private async load_orders() {
    this.loading = true;
    const organization_id = this.get_organization_id();

    try {
      const { orders, eating_tables, eating_tables_groups, users } =
        await clientOrganizationTrpc.orders.order_of_organization.mutate({
          organization_id,
        });

      this.orders = orders.map((order: any) => {
        return {
          ...order,
          created_at: new Date(order.created_at),
        };
      });

      this.eating_tables = eating_tables;

      this.eating_tables_groups = eating_tables_groups.map((group: any) => {
        const items = group.eating_tables.map((item: any) => {
          return {
            label: item.name,
            value: item.id,
          };
        });

        return {
          label: group.name,
          value: group.id,
          items,
        };
      });

      this.users = users;
    } catch (error) {}

    this.loading = false;
    this.get_organization_name(organization_id);

    // orders -> listado de pedidos
    // eating_tables -> Listado de mesas
    // eating_tables_groups -> Listado de grupos de mesas (incluye el listado de mesas)
    // users -> Listado de usuarios que han podido realizar pedidos
  }

  async view_cart_products(order: Order) {
    const eating_table_name = this.getEatingTable(order.eating_table_id || '');

    const cart_products = (order as any).cart_products;

    const modal = await this._modalController.create({
      component: ModalViewOrdersComponent,
      backdropDismiss: false,
      componentProps: {
        cart_products,
        eating_table_name,
        order,
      },
      mode: 'ios',
    });

    await modal.present();
  }

  async view_orders_selecteds(selecteds_orders: Orders) {
    const modal = await this._modalController.create({
      component: ModalViewSelectedsOrdersComponent,
      backdropDismiss: false,
      componentProps: {
        selecteds_orders,
        eating_tables: this.eating_tables,
      },
      mode: 'ios',
    });

    await modal.present();
  }

  getEatingTable(eating_table_id: string) {
    let name = '';

    this.eating_tables.forEach((table) => {
      if (table.id === eating_table_id) {
        name = table.name;
      }
    });

    return name;
  }

  getUser(user_id: string) {
    const email =
      this.users.find((user) => user.id === user_id)?.email ||
      'Sin Especificar';
    return email;
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
