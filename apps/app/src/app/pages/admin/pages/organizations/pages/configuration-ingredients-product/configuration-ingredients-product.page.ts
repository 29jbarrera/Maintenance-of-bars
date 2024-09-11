import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import {
  HeaderAppComponent,
  ModalSelectProductsComponent,
} from '@komandero/web-share';
import { ActivatedRoute, Router } from '@angular/router';
import { get_organization_id } from '@komandero/utils';
import { clientOrganizationTrpc } from '@komandero/clientTRPC';
import { FilterProducts } from './configuration-ingredient.pipe';
import { PillCheckboxComponent } from 'apps/app/src/app/components/shared/pill-checkbox-component/pill-checkbox-component.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ProductIngredientComponentComponent } from 'apps/app/src/app/components/shared/product-ingredient-component/product-ingredient-component.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    HeaderAppComponent,
    FilterProducts,
    PillCheckboxComponent,
    ToastModule,
    ProductIngredientComponentComponent,
  ],
  templateUrl: './configuration-ingredients-product.page.html',
  styleUrl: './configuration-ingredients-product.page.scss',
  providers: [MessageService],
})
export class ConfigurationIngredientsProductPage {
  public search_term: string = '';
  public products_with_ingredients: any[] = [];
  public products_selected: string[] = [];

  constructor(
    private readonly _router: Router,
    private _route: ActivatedRoute,
    private _modalController: ModalController,
    private _messageService: MessageService
  ) {}

  ionViewWillEnter() {
    this.products_selected = [];
    this.loadProductsWithIngredients();
  }

  async loadProductsWithIngredients() {
    const organization_id = this.get_organization_id();
    try {
      const response =
        await clientOrganizationTrpc.products.get_products_with_ingredients.mutate(
          { organization_id }
        );
      this.products_with_ingredients = response;
    } catch (error) {}
  }

  async select_products() {
    const modal = await this._modalController.create({
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

    const ids = data.products_selected.map((_product: any) => _product.id);

    this.products_selected = this.products_with_ingredients.filter((_product) =>
      ids.includes(_product.id)
    );
    
  }

  private get_organization_id() {
    return get_organization_id(this._route);
  }

  getIngredients(id: string) {
    const ingredients = this.products_with_ingredients.find(
      (_product: any) => _product.id === id
    );

    return ingredients.ingredient_product;
  }

  get_if_ingredient_active(is_active: boolean) {
    return is_active;
  }

  async add_or_remove(ingredient: any) {
    const update = {
      organization_id: this.get_organization_id(),
      ingredient_id: ingredient.ingredient_id,
      product_id: ingredient.product_id,
      active: ingredient.default,
    };

    try {
      const response =
        await clientOrganizationTrpc.products.update_ingredient_product_active_or_desactive.mutate(
          update
        );

      this.products_with_ingredients = this.products_with_ingredients.map(
        (product: any) => {
          if (product.id === response.product_id) {
            const updated_ingredients = product.ingredient_product.map(
              (ingredient: any) => {
                if (ingredient.ingredient_id === response.ingredient_id) {
                  return { ...ingredient, ...response };
                }
                return ingredient;
              }
            );

            return {
              ...product,
              ingredient_product: updated_ingredients,
            };
          }

          return product;
        }
      );

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

  search_product(event: any) {
    this.search_term = event.target.value.toLowerCase();
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
