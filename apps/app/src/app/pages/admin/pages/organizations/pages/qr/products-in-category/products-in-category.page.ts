import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ItemReorderEventDetail } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { get_category_id, get_organization_id } from '@komandero/utils';
import { clientOrganizationTrpc } from '@komandero/clientTRPC';
import { ProductInCategory, ProductsInCategories } from '../qr-admin.type';
import { HeaderAppComponent } from '@komandero/web-share';
import { ProgressBarModule } from 'primeng/progressbar';
import { ListProductsInCategoryComponent } from './components/list-products-in-category/list-products-in-category.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ToastModule,
    HeaderAppComponent,
    ProgressBarModule,
    ListProductsInCategoryComponent,
  ],
  templateUrl: './products-in-category.page.html',
  styleUrl: './products-in-category.page.scss',
  providers: [MessageService],
})
export class ProductsInCategoryPage {
  products: ProductsInCategories = [];
  products_reset: ProductsInCategories = [];
  allergens: any = [];
  order_products: boolean = false;
  loading: boolean = false;
  name_of_category_product: string = '';

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _messageService: MessageService
  ) {}

  ionViewWillEnter() {
    this.getNameOfCategory();
    this.loadProductsWithinACategory();
    this.getAllAllergens();
  }

  private get_organization_id() {
    return get_organization_id(this._route);
  }

  private get_category_id() {
    return get_category_id(this._route);
  }

  async loadProductsWithinACategory() {
    const data = {
      organization_id: this.get_organization_id(),
      product_category_id: this.get_category_id(),
    };

    try {
      const products =
        await clientOrganizationTrpc.qr.get_products_within_category.mutate(
          data
        );

      this.products = products;
      this.products_reset = JSON.parse(JSON.stringify(products));
    } catch (error) {}
  }

  async getNameOfCategory() {
    const data = {
      organization_id: this.get_organization_id(),
      id: this.get_category_id(),
    };

    try {
      const response =
        await clientOrganizationTrpc.qr.get_name_of_category.mutate(data);

      if (!response) return;

      const { name } = response;
      this.name_of_category_product = name;
    } catch (error) {}
  }

  async getAllAllergens() {
    try {
      const { allergens } =
        await clientOrganizationTrpc.qr.getAllAllergen.mutate();

      if (!allergens) return;

      this.allergens = allergens;
    } catch (error) {}
  }

  async activeAllergen(active: any) {
    const { product, a_id } = active;

    const isActive = !!product.product_allergen.find(
      (a: any) => a.a_id === a_id
    );

    const update = {
      product_id: product.id,
      a_id,
      active: isActive,
    };

    try {
      const response = await clientOrganizationTrpc.qr.change_allergen.mutate(
        update
      );
      if (!response) return;

      this.products = this.products.map((p) => {
        if (p.id === response.product_id && !update.active) {
          p.product_allergen.push(response);
          return p;
        }

        if (p.id === response.product_id && update.active) {
          const i = p.product_allergen.findIndex(
            (a) => a.a_id === response.a_id
          );
          return {
            ...p,
            product_allergen: [
              ...p.product_allergen.slice(0, i),
              ...p.product_allergen.slice(i + 1),
            ],
          };
        }

        return p;
      });
      this._messageService.add({
        severity: 'success',
        summary: 'Completado',
        detail: `Alergeno ${update.active ? 'eliminado' : 'añadido'}`,
      });
    } catch (error) {
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
      });
    }
  }

  reorder() {
    this.order_products = !this.order_products;
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    const from = ev.detail.from;
    const to = ev.detail.to;

    const item_to_move = this.products.splice(from, 1)[0];
    this.products.splice(to, 0, item_to_move);

    ev.detail.complete();
  }

  reset_order() {
    this.products = [];

    try {
      this.products = this.products_reset.map((c) => {
        return {
          ...c,
        };
      });
      this._messageService.add({
        severity: 'success',
        summary: 'Completado',
        detail: 'Orden restaurado',
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
    this.products.forEach((product, index) => {
      product.qr_o = index;
    });

    const update = {
      organization_id: this.get_organization_id(),
      products: this.products.map((c) => {
        return {
          id: c.id,
          qr_o: c.qr_o,
        };
      }),
    };

    try {
      const response =
        await clientOrganizationTrpc.qr.save_order_products.mutate(update);

      if (!response) return;

      this._messageService.add({
        severity: 'success',
        summary: 'Completado',
        detail: 'Orden guardado',
      });
    } catch (error) {
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
      });
    }
  }

  async change_order_of_products(product: ProductInCategory) {
    const { id, qr_v } = product;
    const organization_id = this.get_organization_id();

    const update_qr_view = {
      organization_id,
      id,
      qr_v,
    };

    try {
      const response =
        await clientOrganizationTrpc.qr.change_order_of_products.mutate(
          update_qr_view
        );

      if (!response) return;

      this.products = this.products.map((c) => {
        if (response.id === c.id) {
          return { ...c, ...response };
        }
        return c;
      });

      this._messageService.add({
        severity: 'success',
        summary: 'Completado',
        detail: `${
          response.qr_v ? 'Habilitado' : 'Deshabilitado'
        } vista categoría`,
      });
    } catch (error) {
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
      });
    }
  }

  getIsActive(product: ProductInCategory, allergen_id: number) {
    const isActive = product.product_allergen.find(
      (a: any) => a.a_id === allergen_id
    );

    return isActive ? 'active' : 'no-active';
  }

  goBack() {
    this._router.navigate([
      'authenticated',
      'admin',
      'organizations',
      this.get_organization_id(),
      'qr',
    ]);
  }
}
