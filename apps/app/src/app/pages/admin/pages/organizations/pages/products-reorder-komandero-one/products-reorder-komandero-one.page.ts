import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonicModule,
  ItemReorderEventDetail,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { get_organization_id } from '@komandero/utils';
import { clientOrganizationTrpc } from '@komandero/clientTRPC';
import { ProductsToReorder, reorder_products_by_priority } from './types';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalSelectProductsComponent } from '@komandero/web-share';
import { PriorityType } from '@komandero/commons';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule],
  templateUrl: './products-reorder-komandero-one.page.html',
  styleUrl: './products-reorder-komandero-one.page.scss',
})
export class ProductsReorderKomanderoOnePage {
  priority_type: PriorityType = 'priority';
  priority_types: {
    label: string;
    value: PriorityType;
  }[] = [
    { value: 'priority', label: 'Priority' },
    { value: 'priority_ko', label: 'Priority KO' },
    { value: 'priority_u', label: 'Priority U' },
  ];
  public products_selected: any[] = [];

  products: ProductsToReorder = [];

  priority_start_at: number = 1;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private loadingController: LoadingController,
    private modalController: ModalController,
  ) {}

  ionViewWillEnter() {
    // this.load_products();
  }

  private get_organization_id() {
    return get_organization_id(this._route);
  }

  async select_products() {
    const modal = await this.modalController.create({
      component: ModalSelectProductsComponent,
      componentProps: {
        organization_id: this.get_organization_id(),
        products_selected: this.products_selected,
      },
      backdropDismiss: false,
      mode: 'ios',
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role !== 'confirm') return;

    this.products_selected = data.products_selected;
  }

  async load_products() {
    const organization_id = this.get_organization_id();

    const products =
      await clientOrganizationTrpc.products.get_all_to_reorder.mutate({
        organization_id,
        products_ids: this.products_selected.map((product) => product.id),
      });

    this.products = reorder_products_by_priority(products, this.priority_type);

    // Set the priority start at the last product
    this.priority_start_at = this.products[0][this.priority_type];
  }

  change_priority_type(event: any) {
    console.log('priority_type', event);
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    const from = ev.detail.from;
    const to = ev.detail.to;
    const item_to_move = this.products.splice(from, 1)[0];
    this.products.splice(to, 0, item_to_move);

    ev.detail.complete();

  }

  async save_order() {
    const organization_id = this.get_organization_id();

    const loading = await this.loadingController.create({
      duration:0
    });
    await loading.present();

    await clientOrganizationTrpc.products.update_priority.mutate({
      organization_id,
      prior: this.priority_type,
      products: this.products.map((product, index) => {
        return {
          id: product.id,
          num: this.priority_start_at + index,
        };
      }),
    });

    await loading.dismiss();

    this.load_products();
  }
}
