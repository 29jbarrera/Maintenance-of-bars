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
import { get_category_id, get_organization_id } from '@komandero/utils';
import { clientOrganizationTrpc } from '@komandero/clientTRPC';
import {
  ProductOfCategory,
  Category,
  CategoryThatModifyThis,
  CategoryThatUseThis,
  productCategoriesForm,
} from './types';
import { PaginatorModule } from 'primeng/paginator';
import { HeaderAppComponent } from '@komandero/web-share';
import { FilterProductCategoryPipe } from './product-category.pipe';
import { ModalProductCategoryComponent } from './components/modal-product-category/modal-product-category.component';
import { Categories } from '../product-categories/type';
import { ModalEditProductCategoryComponent } from './components/modal-edit-product-category/modal-edit-product-category.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { NoResultsComponent } from 'apps/app/src/app/components/shared/no-results/no-results.component';
import { CategoryThatModifyItemComponent } from './components/category-that-modify-item/category-that-modify-item.component';
import { CategoryThatUseItemComponent } from './components/category-that-use-item/category-that-use-item.component';
import { ProductItemComponent } from './components/product-item/product-item.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    HeaderAppComponent,
    ToastModule,
    PaginatorModule,
    FilterProductCategoryPipe,
    NoResultsComponent,
    CategoryThatModifyItemComponent,
    CategoryThatUseItemComponent,
    ProductItemComponent,
  ],
  templateUrl: './product-category.page.html',
  styleUrl: './product-category.page.scss',
  providers: [MessageService],
})
export class ProductCategoryPage {
  // Paginator y IonContent
  @ViewChild('paginator') paginator!: ElementRef;
  @ViewChild(IonContent, { static: false }) content!: IonContent;

  public category: Category | undefined;
  public categories: Categories = [];
  public search_term: string = '';
  public loading: boolean = false;
  public previous_height_container_products: number = 0;

  first: number = 0;
  rows: number = 5;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private loadingController: LoadingController,
    private _messageService: MessageService,
    private modalController: ModalController,
    private actionSheetCtrl: ActionSheetController
  ) {}

  ionViewWillEnter() {
    this.load_products();
    this.load_categories();
  }

  private get_organization_id() {
    return get_organization_id(this._route);
  }

  private get_category_id() {
    return get_category_id(this._route);
  }

  async load_categories() {
    this.loading = true;
    const organization_id = this.get_organization_id();

    const { categories } = await clientOrganizationTrpc.products.get_all.mutate(
      { organization_id }
    );
    this.categories = categories;

    this.loading = false;
  }

  private async load_products() {
    this.loading = true;
    const organization_id = this.get_organization_id();
    const category_id = this.get_category_id();
    try {
      const { category } =
        await clientOrganizationTrpc.product_category.get_by_id.mutate({
          id: category_id,
          organization_id: organization_id,
        });
      this.category = category;
    } catch (error) {
      console.error('Error al cargar productos', error);
    }
    this.loading = false;
  }

  categories_that_modify_this() {
    const categories =
      this.category
        ?.product_category_has_other_product_category_product_category_has_other_product_category_idToproduct_category ||
      [];
    return categories.sort((a, b) => a.o - b.o);
  }

  categories_that_use_this() {
    const categories =
      this.category
        ?.product_category_has_other_product_category_product_category_has_other_product_category_pc_idToproduct_category ||
      [];

    return categories.sort((a, b) => a.o - b.o);
  }

  async view_modal_product_category(
    category: Category | null,
    action: 'add_category_that_modify' | 'add_category_that_use'
  ) {
    let title_modal = '';
    const _categories_that_modify_this = this.categories_that_modify_this().map(
      (_category: any) => _category.pc_id
    );
    const _categories_that_use_this = this.categories_that_use_this().map(
      (_category: any) => _category.id
    );

    let categories: any[] = this.categories;

    const current_category = this.get_category_id();

    if (action === 'add_category_that_modify') {
      title_modal = 'Añadir categoría que modifican a esta';
      categories = categories.filter(
        (category: Category) =>
          !_categories_that_modify_this.includes(category.id) &&
          category.id !== current_category
      );
    } else if (action === 'add_category_that_use') {
      title_modal = 'Añadir categoría que usan esta';
      categories = categories.filter(
        (category: Category) =>
          !_categories_that_use_this.includes(category.id) &&
          category.id !== current_category
      );
    }

    const modal = await this.modalController.create({
      component: ModalProductCategoryComponent,
      backdropDismiss: false,
      componentProps: {
        category,
        categories,
        title_modal,
        action,
      },
      mode: 'ios',
    });
    await modal.present();
    const { data, role } = await modal.onWillDismiss();

    if (role === 'add_category_that_modify') {
      await this.add_category_that_modify(data);
    } else if (role === 'add_category_that_use') {
      await this.add_category_that_use(data);
    }
    this.load_products();
  }

  async add_category_that_modify(category_that_modify: CategoryThatModifyThis) {
    const loading = await this.loadingController.create({
      message: 'Añadiendo categoría...',
      duration: 0,
    });
    await loading.present();

    try {
      const categories_ids = Array.isArray(category_that_modify.id)
        ? category_that_modify.id
        : [];

      await clientOrganizationTrpc.product_category.add_categories_that_modify.mutate(
        {
          id: this.get_category_id(),
          organization_id: this.get_organization_id(),
          categories_ids,
        }
      );
      this._messageService.add({
        severity: 'success',
        summary: 'Completado',
        detail: 'Categoría añadida',
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

  async delete_category_that_modify(
    category_that_modify: CategoryThatModifyThis
  ) {
    const confirm_delete_product = await this.actionSheetCtrl.create({
      header: 'Eliminar producto',
      mode: 'ios',
      buttons: [
        {
          icon: 'trash',
          text: 'Confirmar',
          role: 'confirm',
          handler: () => {
            this.confirm_delete_category_that_modify(category_that_modify);
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

  async confirm_delete_category_that_modify(
    category_that_modify: CategoryThatModifyThis
  ) {
    const loading = await this.loadingController.create({
      message: 'Eliminando categoría...',
      duration: 0,
    });

    await loading.present();

    try {
      const category_id = category_that_modify.pc_id;

      await clientOrganizationTrpc.product_category.delete_categories_that_modify.mutate(
        {
          id: this.get_category_id(),
          organization_id: this.get_organization_id(),
          category_id,
        }
      );

      this.load_products();

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

  async edit_category_that_modify(data: any, id: string) {
    const loading = await this.loadingController.create({
      message: 'Guardando categoría...',
      duration: 0,
    });
    await loading.present();

    try {
      await clientOrganizationTrpc.product_category.edit_category_that_modify.mutate(
        {
          category_id: id,
          id: this.get_category_id(),
          not_add_princing: Boolean(data.not_add_princing),
          o: Number(data.o),
          pi: Number(data.pi),
        }
      );

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

  async add_category_that_use(category_that_use: CategoryThatUseThis) {
    const loading = await this.loadingController.create({
      message: 'Añadiendo categoría...',
      duration: 0,
    });
    await loading.present();
    try {
      const categories_ids = Array.isArray(category_that_use.id)
        ? category_that_use.id
        : [];

      await clientOrganizationTrpc.product_category.add_categories_that_use.mutate(
        {
          id: this.get_category_id(),
          organization_id: this.get_organization_id(),
          categories_ids,
        }
      );

      this._messageService.add({
        severity: 'success',
        summary: 'Completado',
        detail: 'Categoría añadida',
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

  async delete_category_that_use(data: any) {
    const confirm_delete_product = await this.actionSheetCtrl.create({
      header: 'Eliminar producto',
      mode: 'ios',
      buttons: [
        {
          icon: 'trash',
          text: 'Confirmar',
          role: 'confirm',
          handler: () => {
            this.confirm_delete_category_that_use(data);
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

  async confirm_delete_category_that_use(data: any) {
    const loading = await this.loadingController.create({
      message: 'Eliminando categoría...',
      duration: 0,
    });

    await loading.present();

    try {
      const category_id = data.id;

      await clientOrganizationTrpc.product_category.delete_categories_that_use.mutate(
        {
          id: this.get_category_id(),
          organization_id: this.get_organization_id(),
          category_id,
        }
      );

      this.load_products();

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

  async edit_category_that_use(data: any, id: string) {
    const loading = await this.loadingController.create({
      message: 'Guardando categoría...',
      duration: 0,
    });
    await loading.present();

    try {
      await clientOrganizationTrpc.product_category.edit_category_that_use.mutate(
        {
          category_id: id,
          id: this.get_category_id(),
          not_add_princing: Boolean(data.not_add_princing),
          o: Number(data.o),
          pi: Number(data.pi),
        }
      );

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

  async view_modal_edit(_data: any | null) {
    const form_product_categories = productCategoriesForm();
    let pc_id = _data.pc_id as string;
    let id = _data.id as string;
    let type_edit_function = '';

    if (_data) {
      const name =
        _data
          .product_category_product_category_has_other_product_category_pc_idToproduct_category
          ?.name ||
        _data
          .product_category_product_category_has_other_product_category_idToproduct_category
          ?.name;

      form_product_categories.patchValue({
        name: name,
        o: _data.o,
        pi: _data.pi,
        not_add_princing: _data.not_add_princing,
      });
    }

    if (this.categories_that_modify_this().includes(_data)) {
      type_edit_function = 'edit_category_that_modify';
    } else if (this.categories_that_use_this().includes(_data)) {
      type_edit_function = 'edit_category_that_use';
    }

    const modal = await this.modalController.create({
      component: ModalEditProductCategoryComponent,
      backdropDismiss: false,
      componentProps: {
        _data,
        organization_id: this.get_organization_id(),
        form_product_categories,
        title_modal: 'Editar categoría',
        action: 'edit',
        type_edit_function,
      },
      mode: 'ios',
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'edit' && data) {
      const { formData, type_edit_function } = data;

      if (type_edit_function === 'edit_category_that_modify') {
        await this.edit_category_that_modify(formData, pc_id);
      } else if (type_edit_function === 'edit_category_that_use') {
        await this.edit_category_that_use(formData, id);
      }
    } else {
      return;
    }
    await this.load_products();
  }

  async delete_product(product: ProductOfCategory) {
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

  async confirm_delete_product(product: ProductOfCategory) {
    const loading = await this.loadingController.create({
      message: 'Eliminando producto...',
      duration: 0,
    });

    await loading.present();

    try {
      await clientOrganizationTrpc.products.delete.mutate({
        id: product.id,
        organization_id: this.get_organization_id(),
      });

      this.load_products();
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

  // Cuando se cambien de Filas o Páginas
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

  // Scroll to Paginator
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
      'product-categories',
    ]);
  }
}
