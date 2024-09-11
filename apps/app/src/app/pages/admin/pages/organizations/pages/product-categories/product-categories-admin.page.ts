import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Categories, Category, productCategoriesForm } from './type';
import {
  ActionSheetController,
  IonContent,
  IonicModule,
  ItemReorderEventDetail,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { clientOrganizationTrpc } from '@komandero/clientTRPC';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { PaginatorModule } from 'primeng/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { get_organization_id } from '@komandero/utils';
import { ModalProductCategoriesComponent } from './components/modal-product-categories/modal-product-categories.component';
import { FilterProductCategoriesPipe } from './product-categories.pipe';
import { HeaderAppComponent } from '@komandero/web-share';
import { MessageService } from 'primeng/api';
import { ProductCategoryItemComponent } from './components/product-category-item/product-category-item.component';

@Component({
  selector: 'app-product-categories-admin',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    TableModule,
    ToastModule,
    FilterProductCategoriesPipe,
    HeaderAppComponent,
    PaginatorModule,
    ProductCategoryItemComponent,
  ],
  templateUrl: './product-categories-admin.page.html',
  styleUrl: './product-categories-admin.page.scss',
  providers: [MessageService],
})
export class ProductCategoriesAdminPage {
  @ViewChild('paginator') paginator!: ElementRef;
  @ViewChild(IonContent, { static: false }) content!: IonContent;

  public categories: Categories = [];
  public categories_reset_order: Categories = [];
  public search_term: string = '';
  public organization_name: any;
  public order_categories: boolean = false;

  first: number = 0;
  rows: number = 10;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private loadingController: LoadingController,
    private modalController: ModalController,
    private _messageService: MessageService,
    private actionSheetCtrl: ActionSheetController
  ) {}

  ionViewWillEnter() {
    this.load_categories();
  }

  reorder() {
    this.order_categories = !this.order_categories;
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    const from = ev.detail.from;
    const to = ev.detail.to;

    const item_to_move = this.categories.splice(from, 1)[0];
    this.categories.splice(to, 0, item_to_move);

    ev.detail.complete();
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

  async load_categories() {
    const organization_id = this.get_organization_id();

    const { categories } = await clientOrganizationTrpc.products.get_all.mutate(
      { organization_id }
    );

    this.categories = categories;
    this.categories_reset_order = JSON.parse(JSON.stringify(categories));

    this.get_organization_name(organization_id);
  }

  reset_order() {
    this.categories = [];

    try {
      this.categories = this.categories_reset_order.map((c) => {
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
    this.categories.forEach((category, index) => {
      category.priority_u = index;
    });

    const update = {
      organization_id: this.get_organization_id(),
      categories: this.categories.map((c) => {
        return {
          id: c.id,
          priority_u: c.priority_u,
        };
      }),
    };

    try {
      const response =
        await clientOrganizationTrpc.products_categories.save_order_category.mutate(
          update
        );
      if (!response) return;
      this._messageService.add({
        severity: 'success',
        summary: 'Completado',
        detail: 'Actualizado',
      });
    } catch (error) {
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
      });
    }
  }

  search_categories(event: any) {
    this.search_term = event.target.value.toLowerCase();
  }

  async view_modal_product_categories(category: Category | null) {
    const form_product_categories = productCategoriesForm();
    let title_modal = '';
    let action = 'add';
    let id = category?.id as string;
    if (category) {
      form_product_categories.patchValue({
        name: category.name,
      });
      action = 'edit';
      title_modal = 'Editar categoría';
    } else {
      title_modal = 'Añadir nueva categoría';
    }
    const modal = await this.modalController.create({
      component: ModalProductCategoriesComponent,
      backdropDismiss: false,
      componentProps: {
        category,
        organization_id: this.get_organization_id(),
        form_product_categories,
        title_modal,
        id,
        action,
      },
      mode: 'ios',
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'add') {
      await this.create_category(data);
    }
    if (role === 'edit') {
      await this.edit_category(data, id);
    }
  }

  async create_category(data: any) {
    const loading = await this.loadingController.create({
      message: 'Creando categoría...',
      duration: 0,
    });

    await loading.present();
    try {
      await clientOrganizationTrpc.products_categories.create.mutate({
        name: data.name,
        organization_id: this.get_organization_id(),
      });
      this._messageService.add({
        severity: 'success',
        summary: 'Completado',
        detail: 'Categoría creada',
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

  async edit_category(data: any, id: string) {
    const loading = await this.loadingController.create({
      message: 'Guardando categoría...',
      duration: 0,
    });

    await loading.present();
    try {
      await clientOrganizationTrpc.products_categories.edit.mutate({
        name: data.name,
        id,
        organization_id: this.get_organization_id(),
      });
      this._messageService.add({
        severity: 'success',
        summary: 'Completado',
        detail: 'Categoría actualizada',
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

  async delete_product_category(category: Category) {
    const confirm_delete_product = await this.actionSheetCtrl.create({
      header: 'Eliminar categoría',
      mode: 'ios',
      buttons: [
        {
          icon: 'trash',
          text: 'Confirmar',
          role: 'confirm',
          handler: () => {
            this.confirm_delete_product_category(category);
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

  async confirm_delete_product_category(category: Category) {
    const loading = await this.loadingController.create({
      message: 'Eliminando categoría...',
      duration: 0,
    });

    await loading.present();

    try {
      await clientOrganizationTrpc.products_categories.delete.mutate({
        id: category.id,
        organization_id: this.get_organization_id(),
      });
      this.load_categories();
      this._messageService.add({
        severity: 'success',
        summary: 'Completado',
        detail: 'Categoría eliminada',
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

  view_category(category: Category) {
    this._router.navigate([
      'authenticated',
      'admin',
      'organizations',
      this.get_organization_id(),
      'product-categories',
      category.id,
    ]);
  }

  // TODO: PAGINATOR BUGS SCROLL
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
}
