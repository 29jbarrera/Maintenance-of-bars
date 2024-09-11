import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ActionSheetController,
  IonContent,
  IonicModule,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { clientOrganizationTrpc } from '@komandero/clientTRPC';
import {
  ProductsList,
  Categories,
  productForm,
  ProductsListItem,
  FilterSizeSelected,
  FilterModifierSelected,
} from './type';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaginatorModule } from 'primeng/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { get_organization_id } from '@komandero/utils';
import { ModalProductsComponent } from './components/modal-products/modal-products.component';
import { FilterProductsAdminPipe } from './products-admin.pipe';
import { HeaderAppComponent } from '@komandero/web-share';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { cent_to_eur, eur_to_cent } from '@komandero/commons';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { order_product_to_waiter } from '../../types';

@Component({
  selector: 'app-products-admin',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    ToastModule,
    FilterProductsAdminPipe,
    HeaderAppComponent,
    MultiSelectModule,
    PaginatorModule,
    DropdownModule,
    ProductItemComponent,
  ],
  templateUrl: './products-admin.page.html',
  styleUrl: './products-admin.page.scss',
  providers: [MessageService],
})
export class ProductsAdminPage {
  @ViewChild('paginator') paginator!: ElementRef;
  @ViewChild(IonContent, { static: false }) content!: IonContent;

  public products: ProductsList = [];
  public search_term: string = '';
  public categories: Categories = [];
  public categories_selecteds: string[] = [];
  public organization_name: string = '';
  public loading: boolean = false;

  first: number = 0;
  rows: number = 5;

  public sizeFilterOptions = [
    { name: 'Todos los productos según tamaño', value: 'all' },
    { name: 'Con tamaño', value: 'with_size' },
    { name: 'Sin tamaño', value: 'without_size' },
  ];

  public modifierFilterOptions = [
    { name: 'Todos los productos según modificadores', value: 'all' },
    { name: 'Con modificadores', value: 'with_modifier' },
    { name: 'Sin modificadores', value: 'whithout_modifier' },
  ];

  public size_filter_selected: FilterSizeSelected = 'all';

  public modifier_filter_selected: FilterModifierSelected = 'all';

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private modalController: ModalController,
    private _messageService: MessageService,
    private actionSheetCtrl: ActionSheetController,
    private _loadingController: LoadingController
  ) {}

  ionViewWillEnter() {
    this.load_products();
  }

  private get_organization_id() {
    return get_organization_id(this._route);
  }

  async get_organization_name(id: string) {
    try {
      const organization =
        await clientOrganizationTrpc.get_organization_name.query({ id });

      this.organization_name = organization?.name || '';
    } catch (error) {}
  }

  private async load_products() {
    this.loading = true;

    const loading = await this._loadingController.create({
      backdropDismiss: false,
      mode: 'ios',
      spinner: 'dots',
      duration: 0,
    });

    await loading.present();

    try {
      const { products, categories } =
        await clientOrganizationTrpc.products.get_all.mutate({
          organization_id: this.get_organization_id(),
        });

      products.sort(order_product_to_waiter);
      this.products = products;
      this.categories = categories;

      this.get_organization_name(this.get_organization_id());
    } catch (error) {
    } finally {
      await loading.dismiss();
      this.loading = false;
    }
  }

  select_all_categories(event: any) {
    if (event.detail.value.includes('all')) {
      this.categories_selecteds = this.categories.map(
        (category) => category.id
      );
    } else if (event.detail.value.length === this.categories.length) {
      this.categories_selecteds = [];
    } else {
      this.categories_selecteds = event.detail.value;
    }
  }

  search_products(event: any) {
    const searchTerm = event?.target?.value || '';
    this.search_term = searchTerm;
  }

  view_product(product: ProductsListItem) {
    this._router.navigate([
      'authenticated',
      'admin',
      'organizations',
      this.get_organization_id(),
      'products',
      product.id,
    ]);
  }

  async add_or_edit_modal_product(product: ProductsListItem | null) {
    const form_product = productForm();
    let title_modal = '';
    let action = 'add';
    if (product) {
      const {
        name,
        name_i,
        price_take_away,
        price_delivery,
        price_pick_up,
        product_category_id,
        organization_id,
        id,
      } = product;

      const _price_take_away = this.format_price(price_take_away);
      const _price_delivery = this.format_price(price_delivery);
      const _price_pick_up = this.format_price(price_pick_up);

      form_product.patchValue({
        name,
        name_i,
        price_take_away: _price_take_away,
        price_delivery: _price_delivery,
        price_pick_up: _price_pick_up,
        product_category_id,
        organization_id,
        id,
      });
      title_modal = 'Editar producto';
      action = 'edit';
    } else {
      form_product.patchValue({
        organization_id: this.get_organization_id(),
      });
      title_modal = 'Añadir nuevo producto';
    }

    const modal = await this.modalController.create({
      component: ModalProductsComponent,
      backdropDismiss: false,
      componentProps: {
        categories: this.categories,
        form_product,
        title_modal,
        action,
      },
      mode: 'ios',
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role !== 'add' && role !== 'edit') return;

    const {
      name,
      name_i,
      product_category_id,
      price_take_away,
      price_delivery,
      price_pick_up,
      organization_id,
      id,
    } = data;

    const _price_take_away = eur_to_cent(price_take_away);
    const _price_delivery = eur_to_cent(price_delivery);
    const _price_pick_up = eur_to_cent(price_pick_up);

    // TODO: revisar si se puede mejorar (se puede)
    const _data: any = {
      name,
      name_i,
      product_category_id,
      price_take_away: _price_take_away,
      price_delivery: _price_delivery,
      price_pick_up: _price_pick_up,
      organization_id,
      id,
    };

    if (role === 'add') {
      this.add_product(_data);
      return;
    }
    this.edit_product(_data);
  }

  async add_product(data: any) {
    const loading = await this._loadingController.create({
      message: 'Añadiendo producto...',
      duration: 0,
    });
    await loading.present();
    try {
      const response: any =
        await clientOrganizationTrpc.products.create_product.mutate(data);

      if (!response) return;

      this.products.push(response);

      this._messageService.add({
        severity: 'success',
        summary: 'Completado',
        detail: 'Producto creado',
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

  async edit_product(data: ProductsListItem) {
    try {
      const response: any =
        await clientOrganizationTrpc.products.edit_product.mutate(data);

      if (!response) return;

      this._messageService.add({
        severity: 'success',
        summary: 'Completado',
        detail: 'Producto actualizado',
      });

      this.products = this.products.map((product: any) => {
        if (response.id === product.id) {
          return {
            ...product,
            ...response,
          };
        }
        return product;
      });
    } catch (error) {
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
      });
    }
  }

  async delete_product(product: ProductsListItem) {
    const confirm_delete_product = await this.actionSheetCtrl.create({
      header: 'Eliminar producto',
      mode: 'ios',
      buttons: [
        {
          icon: 'trash',
          text: 'Confirmar',
          role: 'confirm',
          handler: () => {
            this.confirm_delete_product(product);
          },
        },
        {
          icon: 'close',
          text: 'Cancelar',
          role: 'cancel',
        },
      ],
    });
    await confirm_delete_product.present();
  }

  async confirm_delete_product(product: ProductsListItem) {
    const loading = await this._loadingController.create({
      message: 'Eliminando producto...',
      duration: 0,
    });
    await loading.present();

    try {
      const { product_deleted } =
        await clientOrganizationTrpc.products.delete.mutate({
          id: product.id,
          organization_id: this.get_organization_id(),
        });

      this.products = this.products.filter(
        (_product) => _product.id !== product_deleted.id
      );

      this._messageService.add({
        severity: 'success',
        summary: 'Completado',
        detail: 'Producto eliminado',
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

  async onPageChange(event: any) {
    if (event.rows !== this.rows) {
      this.first = 0;
    } else {
      this.first = event.first;
    }

    this.rows = event.rows;

    if (this.rows > 5) {
      await this.scrollToPaginator();
    }
  }

  async scrollToPaginator() {
    const element = this.paginator.nativeElement;
    if (element) {
      const scrollElement = await this.content.getScrollElement();
      const positionOfPaginator =
        element.getBoundingClientRect().top + scrollElement.scrollTop;

      this.content.scrollToPoint(0, positionOfPaginator + 1000, 50);
    }
  }
  goBack() {
    this._router.navigate([
      'authenticated',
      'admin',
      'organizations',
      this.get_organization_id(),
    ]);
  }

  format_price(price: number): number {
    return cent_to_eur(price);
  }
}
