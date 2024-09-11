import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CentToEurPipe,
  HeaderAppComponent,
  Ingredient,
  Ingredients,
  ModalSelectIngredientsComponent,
  PillCheckboxComponent,
  getFormErrorMessage,
  isFormFieldInvalid,
} from '@komandero/web-share';
import { ActivatedRoute, Router } from '@angular/router';
import { get_organization_id, get_product_id } from '@komandero/utils';
import {
  ActionSheetController,
  IonicModule,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { clientOrganizationTrpc } from '@komandero/clientTRPC';
import { DividerModule } from 'primeng/divider';
import { FormProductComponent } from '../components/form-product/form-product.component';
import {
  addOrEditProductSize,
  AddProductSizeToProduct,
  AllProductSizesOrganization,
  Categories,
  DeleteProductSizeToProduct,
  orderAndVisualizationForm,
  productForm,
  ProductSize,
  ProductsList,
  ProductsListItem,
  UpdatedProductSizePrice,
} from '../type';
import { ModalAddSizesComponent } from './components/modal-add-or-edit-product-size/modal-add-or-edit-product-size.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ModalAddModifiersProductComponent } from './components/modal-add-modifiers-product/modal-add-modifiers-product.component';
import {
  GroupsModifications,
  ingredientProductForm,
  ItemsModifications,
  ModifiersAvailablesToAdd,
  Product,
  ProductListIngredient,
  ProductListIngredients,
  productModificationEditPriceAndOrderForm,
  ProductModifications,
} from './types';

import { cent_to_eur, eur_to_cent } from '@komandero/commons';
import { ModalEditIngredientProductComponent } from './components/modal-edit-ingredient-product/modal-edit-ingredient-product.component';
import { ModalEditProductModificationComponent } from './components/modal-edit-product-modification/modal-edit-product-modification.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    HeaderAppComponent,
    IonicModule,
    DividerModule,
    FormProductComponent,
    PillCheckboxComponent,
    ToastModule,
    InputTextModule,
    ReactiveFormsModule,
    ToastModule,
    InputSwitchModule,
    CentToEurPipe,
  ],
  templateUrl: './product.page.html',
  styleUrl: './product.page.scss',
  providers: [MessageService],
})
export class ProductPage {
  public product!: Product;
  public product_name: string = '';
  public products: ProductsList = [];
  public categories: Categories = [];
  public ingredients: ProductListIngredients = [];
  public modifications: ProductModifications = [];
  public modifiers_availables_to_add: ModifiersAvailablesToAdd = [];

  public update_product_size_price: UpdatedProductSizePrice[] = [];
  public product_size: ProductSize = [];
  public all_product_sizes_organization: AllProductSizesOrganization = [];

  public basic_data_form = productForm();
  public form_add_or_edit_product_size = addOrEditProductSize();
  public form_order_and_visualization = orderAndVisualizationForm();
  public form_edit_ingredient_product = ingredientProductForm();
  public form_edit_product_modification =
    productModificationEditPriceAndOrderForm();

  public list_of_ingredients: Ingredients = [];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _modalController: ModalController,
    private _messageService: MessageService,
    private _loadingController: LoadingController,
    private actionSheetCtrl: ActionSheetController
  ) {}

  ionViewWillEnter() {
    this.loadProductByID();
    this.load_product_size();
    this.are_sizes_available();
  }

  private get_product_id() {
    return get_product_id(this._route);
  }

  private get_organization_id() {
    return get_organization_id(this._route);
  }

  async loadProductByID() {
    const loading = await this._loadingController.create({
      backdropDismiss: false,
      mode: 'ios',
      spinner: 'dots',
      duration: 0,
    });

    await loading.present();

    const id = this.get_product_id();
    const organization_id = this.get_organization_id();

    try {
      const { _product, categories } =
        await clientOrganizationTrpc.products.get_product_by_id.mutate({
          id,
          organization_id,
        });

      this.product = _product;
      this.product_name = _product.name;
      this.categories = categories;
      this.product_size = _product.product_size_price;
      this.ingredients = _product.ingredient_product;
      this.modifications = _product.product_modification;

      // console.log('tamaño de productos', this.product_size);
      // console.log('ingredients', this.ingredients);
      // console.log('modificadores', this.modifications);

      this.set_basic_data_form();
      this.set_order_and_visualization_data_form();
      this.get_all_modifiers_to_add();
      this.get_list_of_ingredients();
    } catch (error) {}
    await loading.dismiss();
  }

  async load_product_size() {
    const organization_id = this.get_organization_id();

    const { product_sizes } =
      await clientOrganizationTrpc.product_size.get_all.mutate({
        organization_id,
      });
    this.all_product_sizes_organization = product_sizes;
  }

  async get_list_of_ingredients() {
    try {
      const { ingredients } =
        await clientOrganizationTrpc.ingredients.get_all.mutate({
          organization_id: this.get_organization_id(),
        });
      this.list_of_ingredients = ingredients;
    } catch (error) {}
  }

  set_basic_data_form() {
    const {
      name,
      name_i,
      price_take_away,
      price_delivery,
      price_pick_up,
      product_category_id,
      organization_id,
      id,
    } = this.product;

    const _price_take_away = cent_to_eur(price_take_away);
    const _price_delivery = cent_to_eur(price_delivery);
    const _price_pick_up = cent_to_eur(price_pick_up);

    this.basic_data_form.patchValue({
      name,
      name_i,
      price_take_away: _price_take_away,
      price_delivery: _price_delivery,
      price_pick_up: _price_pick_up,
      product_category_id,
      organization_id,
      id,
    });
  }

  set_order_and_visualization_data_form() {
    const { priority, priority_ko, priority_u, qr_o, w_v } = this.product;

    this.form_order_and_visualization.patchValue({
      priority,
      priority_ko,
      priority_u,
      qr_o,
      w_v,
    });
  }

  async save_changes_basic_data(basic_data: Product) {
    const loading = await this._loadingController.create({
      message: 'Editando producto...',
      duration: 0,
    });
    await loading.present();

    try {
      const {
        name,
        name_i,
        price_delivery,
        price_pick_up,
        price_take_away,
        product_category_id,
      } = this.basic_data_form.value;

      const filteredData = {
        id: basic_data.id,
        name,
        name_i,
        organization_id: basic_data.organization_id,
        price_delivery: eur_to_cent(price_delivery),
        price_pick_up: eur_to_cent(price_pick_up),
        price_take_away: eur_to_cent(price_take_away),
        product_category_id,
      };

      const response =
        await clientOrganizationTrpc.products.edit_product.mutate(filteredData);

      if (!response) return;

      this._messageService.add({
        severity: 'success',
        summary: 'Completado',
        detail: 'Producto actualizado',
      });

      this.products = this.products.map((product: ProductsListItem) => {
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
    await loading.dismiss();
  }

  getAvailableSizes() {
    return getAvailableSizes(
      this.all_product_sizes_organization,
      this.product_size
    );
  }

  are_sizes_available() {
    return are_sizes_available(
      this.all_product_sizes_organization,
      this.product_size
    );
  }

  disable_add_product_size() {
    return !this.are_sizes_available();
  }

  async view_modal_add_sizes() {
    this.form_add_or_edit_product_size = addOrEditProductSize();

    this.form_add_or_edit_product_size.patchValue({
      product_id: this.product.id,
    });

    const available_sizes = this.getAvailableSizes();

    const modal = await this._modalController.create({
      component: ModalAddSizesComponent,
      backdropDismiss: false,
      componentProps: {
        form_add_or_edit_product_size: this.form_add_or_edit_product_size,
        availables_product_sizes: available_sizes,
      },
      mode: 'ios',
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role !== 'create') return;

    this.add_product_size(data);
  }

  async add_product_size(product_size_price: AddProductSizeToProduct) {
    const loading = await this._loadingController.create({
      message: 'Añadiendo tamaño...',
      duration: 0,
    });

    await loading.present();

    const { product_id, product_size_id, price } = product_size_price;

    const add_product_size = {
      product_id,
      product_size_id,
      price: eur_to_cent(price),
      organization_id: this.get_organization_id(),
    };

    try {
      const { add_product_size_price } =
        await clientOrganizationTrpc.products.add_product_size_to_product.mutate(
          add_product_size
        );

      this.product_size.push(add_product_size_price);

      this._messageService.add({
        severity: 'success',
        summary: 'Completado',
        detail: 'Tamaño añadido',
      });
    } catch (error) {
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
      });
    }
    await loading.dismiss();
    this.are_sizes_available();
  }

  async view_modal_edit_product_size_price(
    product_size_price: UpdatedProductSizePrice
  ) {
    const { product_id, product_size_id, price } = product_size_price;
    this.form_add_or_edit_product_size.patchValue({
      product_id,
      product_size_id,
      price: cent_to_eur(price),
    });

    this.form_add_or_edit_product_size.get('product_size_id')?.disable();

    const modal = await this._modalController.create({
      component: ModalAddSizesComponent,
      backdropDismiss: false,
      componentProps: {
        availables_product_sizes: this.all_product_sizes_organization,
        form_add_or_edit_product_size: this.form_add_or_edit_product_size,
      },
      mode: 'ios',
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role !== 'create') return;

    const update_product_size_price: UpdatedProductSizePrice = {
      product_size_id: product_size_price.product_size_id,
      product_id: data.product_id,
      price: eur_to_cent(data.price),
    };

    this.edit_product_size_price(update_product_size_price);
  }

  async edit_product_size_price(
    update_product_size_price: UpdatedProductSizePrice
  ) {
    const loading = await this._loadingController.create({
      message: 'Editando tamaño...',
      duration: 0,
    });

    await loading.present();

    try {
      const { updated_product_size_price } =
        await clientOrganizationTrpc.products.edit_product_size_price.mutate(
          update_product_size_price
        );

      this.product_size = this.product_size.map((product) => {
        if (
          product.product_size_id === updated_product_size_price.product_size_id
        ) {
          return {
            ...product,
            ...update_product_size_price,
          };
        }
        return product;
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

  async delete_product_size(
    product_size_to_product: DeleteProductSizeToProduct
  ) {
    const confirm_delete_product = await this.actionSheetCtrl.create({
      header: 'Eliminar tamaño',
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
    await confirm_delete_product.present();

    const { role } = await confirm_delete_product.onDidDismiss();

    if (role !== 'confirm') return;

    this.confirm_delete_product_size(product_size_to_product);
  }

  async confirm_delete_product_size(
    product_size_to_product: DeleteProductSizeToProduct
  ) {
    const loading = await this._loadingController.create({
      message: 'Eliminando tamaño...',
      duration: 0,
    });
    await loading.present();

    try {
      const { product_size_deleted } =
        await clientOrganizationTrpc.products.delete_product_size_prices.mutate(
          {
            product_id: product_size_to_product.product_id,
            product_size_id: product_size_to_product.product_size_id,
          }
        );

      this.product_size = this.product_size.filter(
        (product) =>
          product.product_size_id !== product_size_deleted.product_size_id
      );

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
    this.are_sizes_available();
    await loading.dismiss();
  }

  async active_or_desactive_ingredient_product(ingredient: ProductListIngredient) {
    const update = {
      organization_id: this.get_organization_id(),
      product_id: this.get_product_id(),
      ingredient_id: ingredient.ingredient_id,
      active: ingredient.default,
    };

    try {
      const response =
        await clientOrganizationTrpc.products.update_ingredient_product_active_or_desactive.mutate(
          update
        );

      this.ingredients = this.ingredients.map((ingredient) => {
        if (ingredient.ingredient_id === response.ingredient_id) {
          return { ...ingredient, ...response };
        }
        return ingredient;
      });

      this._messageService.clear();

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

  async remove_product_modifcation(modification: ProductModifications[0]) {
    const confirm_remove_product_modification =
      await this.actionSheetCtrl.create({
        header: `Eliminar Modificador ${modification.app_product_modification.name}`,
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
    await confirm_remove_product_modification.present();

    const { role } = await confirm_remove_product_modification.onDidDismiss();

    if (role !== 'confirm') return;

    const remove_modification = {
      p_id: modification.p_id,
      apm: Number(modification.apm),
    };

    try {
      const response =
        await clientOrganizationTrpc.products.remove_product_modification.mutate(
          remove_modification
        );
      if (response) {
        this.modifications = this.modifications.filter(
          (modification) =>
            Number(modification.apm) !== remove_modification.apm
        );
        this._messageService.add({
          severity: 'success',
          summary: 'Completado',
          detail: 'Modificadore Eliminado',
        });
      }
    } catch (error) {
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
      });
    }
  }

  async edit_order_and_visualization() {
    this.form_order_and_visualization.markAllAsTouched();

    if (this.form_add_or_edit_product_size.invalid) return;
    const date_form = this.form_order_and_visualization.value;

    const id = this.product.id;
    const organization_id = this.product.organization_id;
    const product_category_id = this.product.product_category_id;

    const edit_order_and_visualization = {
      ...date_form,
      id,
      organization_id,
      product_category_id,
    };

    const loading = await this._loadingController.create({
      message: 'Editando datos...',
      duration: 0,
    });

    await loading.present();

    try {
      await clientOrganizationTrpc.products.edit_order_and_visualization.mutate(
        edit_order_and_visualization
      );

      this._messageService.add({
        severity: 'success',
        summary: 'Completado',
        detail: 'Datos actualizados',
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

  async get_all_modifiers_to_add() {
    try {
      const response =
        await clientOrganizationTrpc.products.get_all_modifiers.mutate();
      this.modifiers_availables_to_add = response;
    } catch (error) {}
  }

  async add_modifiers_to_product() {
    // Modificadores Disponibles
    const modifiers_availables_to_add =
      get_modifiers_availables_to_add_without_modification_already_have_product(
        this.modifiers_availables_to_add,
        this.modifications
      );

    // Grupos de los Modificadores Disponible
    const groups: GroupsModifications[] = modifiers_availables_to_add.map(
      (group) => {
        return {
          label: group.label,
          value: group.value,
        };
      }
    );

    // Items de cada grupo de los Modificadores Disponible
    const items: ItemsModifications[] = modifiers_availables_to_add.flatMap(
      (group) => {
        return group.items;
      }
    );

    const modal = await this._modalController.create({
      component: ModalAddModifiersProductComponent,
      backdropDismiss: false,
      componentProps: {
        groups,
        items,
      },
      mode: 'ios',
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role !== 'create') return;

    const { apm, o, pi } = data;
    const p_id = this.product.id;

    // Modificadores a crear
    const create_modifiers_to_product = {
      p_id,
      apm,
      o,
      pi: eur_to_cent(pi),
    };

    const loading = await this._loadingController.create({
      message: 'Cargando...',
      duration: 0,
      mode: 'ios',
    });

    await loading.present();

    try {
      const response =
        await clientOrganizationTrpc.products.create_product_modification.mutate(
          create_modifiers_to_product
        );

      response.forEach((modifier) => {
        this.modifications.push(modifier);
      });

      this.modifications.sort((a, b) => a.app_product_modification.name.localeCompare(b.app_product_modification.name))

      this._messageService.add({
        severity: 'success',
        summary: 'Completado',
        detail: 'Modificadores Añadido',
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

  async edit_product_modification(modification: ProductModifications[0]) {
    this.form_edit_product_modification =
      productModificationEditPriceAndOrderForm();

    const { p_id, apm, pi, o: order } = modification;

    this.form_edit_product_modification.patchValue({
      p_id,
      apm,
      pi: cent_to_eur(pi),
      o: order,
    });

    const modal = await this._modalController.create({
      component: ModalEditProductModificationComponent,
      backdropDismiss: false,
      componentProps: {
        modification,
        form_edit_product_modification: this.form_edit_product_modification,
      },
      mode: 'ios',
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role !== 'update') return;

    const loading = await this._loadingController.create({
      backdropDismiss: false,
      mode: 'ios',
      spinner: 'dots',
      duration: 0,
    });

    await loading.present();

    const { pi: _pi, o } = data;

    const update_modification = {
      p_id,
      apm,
      pi: eur_to_cent(_pi),
      o: data.o,
    };

    try {
      const { updated_modification } =
        await clientOrganizationTrpc.products.edit_product_modification_by_id.mutate(
          update_modification
        );

      this.modifications = this.modifications.map((modification) => {
        if (modification.apm === update_modification.apm) {
          return { ...modification, ...updated_modification };
        }

        return modification;
      });

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

    await loading.dismiss();
  }

  getFormErrorMessage(name: string) {
    return getFormErrorMessage(name, this.form_order_and_visualization);
  }

  isFormFieldInvalid(name: string) {
    return isFormFieldInvalid(name, this.form_order_and_visualization);
  }

  goBack() {
    this._router.navigate([
      'authenticated',
      'admin',
      'organizations',
      this.get_organization_id(),
      'products',
    ]);
  }

  async add_ingredients() {
    this.list_of_ingredients = this.list_of_ingredients.filter((l_i) => {
      return !this.ingredients.some((i) => i.ingredient_id === l_i.id);
    });

    const modal = await this._modalController.create({
      component: ModalSelectIngredientsComponent,
      componentProps: {
        ingredients: this.list_of_ingredients,
      },
      backdropDismiss: false,
      mode: 'ios',
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role !== 'confirm') return;

    const ingredients_ids = data.ingredients_selected.map(
      (ingredient: any) => ingredient.id
    );

    if (!ingredients_ids.length) {
      this._messageService.add({
        severity: 'info',
        summary: 'Atención',
        detail: 'No has seleccionado ningún ingrediente',
      });
      return;
    }

    const loading = await this._loadingController.create({
      backdropDismiss: false,
      mode: 'ios',
      spinner: 'dots',
      duration: 0,
    });

    await loading.present();

    const add_ingredients = {
      product_id: this.product.id,
      organization_id: this.product.organization_id,
      ingredients_ids,
    };

    try {
      const { created_ingredients_to_product } =
        await clientOrganizationTrpc.products.add_ingredient_to_product.mutate(
          add_ingredients
        );

      created_ingredients_to_product.forEach((ingredient) => {
        this.ingredients.push(ingredient);
      });

      this.ingredients = this.ingredients.sort((a, b) =>
        a.ingredient.name.localeCompare(b.ingredient.name)
      );

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

    await loading.dismiss();
  }

  async delete_ingredient(ingredient: ProductListIngredient) {
    const { ingredient_id, product_id } = ingredient;
    const { name } = ingredient.ingredient;

    const confirm_delete_product = await this.actionSheetCtrl.create({
      header: `Eliminar Ingrediente ${name}`,
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

    await confirm_delete_product.present();

    const { role } = await confirm_delete_product.onDidDismiss();

    if (role !== 'confirm') return;

    const loading = await this._loadingController.create({
      backdropDismiss: false,
      mode: 'ios',
      spinner: 'dots',
      duration: 0,
    });

    await loading.present();

    const delete_ingredient = {
      ingredient_id,
      product_id,
    };

    try {
      await clientOrganizationTrpc.products.remove_ingredient_to_product.mutate(
        delete_ingredient
      );

      this.ingredients = this.ingredients
        .filter((ingredient) => ingredient.ingredient_id !== ingredient_id)
        .sort((a, b) => a.ingredient.name.localeCompare(b.ingredient.name));

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

    await loading.dismiss();
  }

  async edit_ingredient(ingredient: ProductListIngredient) {
    this.form_edit_ingredient_product = ingredientProductForm();

    const { product_id, ingredient_id, price } = ingredient;

    this.form_edit_ingredient_product.patchValue({
      product_id,
      ingredient_id,
      price: cent_to_eur(price),
    });

    const modal = await this._modalController.create({
      component: ModalEditIngredientProductComponent,
      componentProps: {
        ingredient,
        form_edit_ingredient_product: this.form_edit_ingredient_product,
      },
      backdropDismiss: false,
      mode: 'ios',
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role !== 'update') return;

    const loading = await this._loadingController.create({
      backdropDismiss: false,
      mode: 'ios',
      spinner: 'dots',
      duration: 0,
    });

    await loading.present();

    const edit_ingredient = {
      ingredient_id: data.ingredient_id,
      product_id: data.product_id,
      price: eur_to_cent(data.price),
    };

    try {
      const { ingredient_updated } =
        await clientOrganizationTrpc.products.edit_ingredient_to_product.mutate(
          edit_ingredient
        );

      this.ingredients = this.ingredients.map((ingredient) => {
        if (ingredient.ingredient_id === ingredient_id) {
          return { ...ingredient, price: ingredient_updated.price };
        }

        return ingredient;
      });

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

    await loading.dismiss();
  }
}

function get_modifiers_availables_to_add_without_modification_already_have_product(
  modifiers_availables_to_add: ModifiersAvailablesToAdd,
  modifications: ProductModifications
) {
  return modifiers_availables_to_add
    .map((modifier) => {
      return {
        label: modifier.name,
        value: modifier.id,
        items: modifier.app_product_modification
          .filter((m) => {
            return !modifications.some((mod) => mod.apm === m.id);
          })
          .map((product_modification: any) => {
            return {
              name: product_modification.name,
              id: product_modification.id,
              apmg: product_modification.apmg,
            };
          }),
      };
    })
    .filter((apg) => apg.items.length)
    .sort((a: any, b: any) => String(a.label).localeCompare(b.label));
}

function getAvailableSizes(
  all_product_sizes_organization: AllProductSizesOrganization,
  product_size: ProductSize
) {
  return all_product_sizes_organization.filter((size) => {
    return !product_size.some(
      (productSize) => productSize.product_size_id === size.id
    );
  });
}

function are_sizes_available(
  all_product_sizes_organization: AllProductSizesOrganization,
  product_size: ProductSize
) {
  const available_sizes = getAvailableSizes(
    all_product_sizes_organization,
    product_size
  );
  return available_sizes.length > 0;
}
