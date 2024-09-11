import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { get_organization_id } from '@komandero/utils';
import { clientOrganizationTrpc } from '@komandero/clientTRPC';
import { ingredientForm } from './types';
import { IonicModule, ModalController } from '@ionic/angular';
import { FilterIngredients, HeaderAppComponent, Ingredient, Ingredients } from '@komandero/web-share';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ModalCreateOrUpdateIngredientComponent } from './components/modal-create-or-update-ingredient/modal-create-or-update-ingredient.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    HeaderAppComponent,
    ToastModule,
    ConfirmDialogModule,
    FilterIngredients,
  ],
  templateUrl: './ingredients.page.html',
  styleUrl: './ingredients.page.scss',
  providers: [ConfirmationService, MessageService],
})
export class IngredientsPage {
  public ingredients: Ingredients = [];
  public ingredient_form = ingredientForm();
  public search_term: string = '';

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _confirmationService: ConfirmationService,
    private _modalController: ModalController,
    private _messageService: MessageService
  ) {}

  ionViewWillEnter() {
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

  search_ingredient(event: any) {
    this.search_term = event.target.value.toLowerCase();
  }

  private reset_form() {
    this.ingredient_form = ingredientForm();
  }

  async create() {
    this.reset_form();

    const modal = await this._modalController.create({
      component: ModalCreateOrUpdateIngredientComponent,
      backdropDismiss: false,
      componentProps: {
        mode: 'creando',
        ingredient_form: this.ingredient_form,
      },
      mode: 'ios',
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role !== 'create') return;

    const { name } = data;

    const create_ingredient = {
      organization_id: this.get_organization_id(),
      name,
    };

    try {
      const { ingredient_created } =
        await clientOrganizationTrpc.ingredients.create.mutate(
          create_ingredient
        );

      if (!ingredient_created) return;

      this.ingredients.push(ingredient_created);

      this._messageService.add({
        severity: 'success',
        summary: 'Completado',
        detail: 'Ingrediente añadido',
      });
    } catch (error) {
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
      });
    }
  }

  async edit(ingredient: Ingredient) {
    const { id, name, organization_id } = ingredient;

    this.reset_form();

    this.ingredient_form.patchValue({
      id,
      name,
      organization_id,
    });

    const modal = await this._modalController.create({
      component: ModalCreateOrUpdateIngredientComponent,
      backdropDismiss: false,
      componentProps: {
        mode: 'editando',
        name: name,
        ingredient_form: this.ingredient_form,
      },
      mode: 'ios',
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role !== 'update') return;

    const update_ingredient = {
      id: data.id,
      organization_id: data.organization_id,
      name: data.name,
    };

    try {
      const { ingredient_updated } =
        await clientOrganizationTrpc.ingredients.update.mutate(
          update_ingredient
        );

      if (!ingredient_updated) return;

      this.ingredients = this.ingredients.map((ingredient: Ingredient) => {
        if (ingredient.id === ingredient_updated.id) {
          return { ...ingredient, ...ingredient_updated };
        }

        return ingredient;
      });

      this._messageService.add({
        severity: 'success',
        summary: 'Completado',
        detail: 'Ingrediente actualizado',
      });
    } catch (error) {
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
      });
    }
  }

  confirm_delete(ingredient: Ingredient) {
    const { name } = ingredient;

    this._confirmationService.confirm({
      message: `¿Está seguro que desea eliminar ${name}?`,
      header: `Eliminar  ${name}`,
      icon: 'pi pi-check',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      rejectButtonStyleClass: 'p-button-secondary',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.delete(ingredient);
      },
    });
  }

  async delete(ingredient: Ingredient) {
    const { id, organization_id } = ingredient;

    const delete_ingredient = {
      id,
      organization_id,
    };

    try {
      const { igredient_deleted } =
        await clientOrganizationTrpc.ingredients.delete.mutate(
          delete_ingredient
        );

      if (!igredient_deleted) return;

      this.ingredients = this.ingredients.filter(
        (ingredient: Ingredient) => ingredient.id !== id
      );

      this._messageService.add({
        severity: 'success',
        summary: 'Completado',
        detail: 'Ingrediente eliminado',
      });
    } catch (error) {
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
      });
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
