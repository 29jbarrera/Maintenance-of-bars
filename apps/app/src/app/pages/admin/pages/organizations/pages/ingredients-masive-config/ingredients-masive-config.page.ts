import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { get_organization_id } from '@komandero/utils';
import { clientOrganizationTrpc } from '@komandero/clientTRPC';
import { Ingredients } from './types';
import {
  IonicModule,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import {
  HeaderAppComponent,
  ModalSelectProductsComponent,
} from '@komandero/web-share';
import { ModalSelectIngredientsComponent } from 'apps/app/src/app/components/shared/modal-select-ingredients/modal-select-ingredients.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { eur_to_cent } from '@komandero/commons';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    HeaderAppComponent,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
  ],
  templateUrl: './ingredients-masive-config.page.html',
  styleUrl: './ingredients-masive-config.page.scss',
  providers: [MessageService],
})
export class IngredientsMasiveConfigPage {
  ingredients: Ingredients = [];
  ingredients_selected: any = [];
  products_selected: any = [];
  price: number = 0;

  public loading: boolean = false;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private modalController: ModalController,
    private _messageService: MessageService,
    private _loadingController: LoadingController
  ) {}

  ionViewWillEnter() {
    this.ingredients_selected = [];
    this.products_selected = [];
    this.private_load_ingredients();
  }

  private get_organization_id() {
    return get_organization_id(this._route);
  }

  async private_load_ingredients() {
    const { ingredients } =
      await clientOrganizationTrpc.ingredients.get_all.mutate({
        organization_id: this.get_organization_id(),
      });
    this.ingredients = ingredients;
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

  async select_ingredients() {
    const modal = await this.modalController.create({
      component: ModalSelectIngredientsComponent,
      componentProps: {
        ingredients: this.ingredients,
        ingredients_selected: this.ingredients_selected,
      },
      backdropDismiss: false,
      mode: 'ios',
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role !== 'confirm') return;

    this.ingredients_selected = data.ingredients_selected;
  }

  remove_product_selected(product: any) {
    this.products_selected = this.products_selected.filter(
      (_product: any) => _product.id !== product.id
    );
  }

  remove_ingredient_selected(ingredient: any) {
    this.ingredients_selected = this.ingredients_selected.filter(
      (_ingredient: any) => _ingredient.id !== ingredient.id
    );
  }

  async confirm_save_price() {
    const loading = await this._loadingController.create({
      message: 'Actualizando',
      backdropDismiss: false,
      duration: 0,
    });
    
    await loading.present();

    if (!this.ingredients_selected && !this.products_selected) return;

    const ingredients_ids = this.ingredients_selected.map(
      (_ingredient: any) => _ingredient.id
    );
    const products_ids = this.products_selected.map(
      (_product: any) => _product.id
    );

    const data_to_update = {
      organization_id: this.get_organization_id(),
      price: eur_to_cent(this.price),
      products_ids,
      ingredients_ids,
    };

    try {
      const response =
        await clientOrganizationTrpc.ingredients.update_ingredient_product_price.mutate(
          data_to_update
        );
      if (!response) return;

      this.ingredients_selected = [];
      this.products_selected = [];
      this.price = 0;

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

  goBack() {
    this._router.navigate([
      'authenticated',
      'admin',
      'organizations',
      this.get_organization_id(),
    ]);
  }
}
