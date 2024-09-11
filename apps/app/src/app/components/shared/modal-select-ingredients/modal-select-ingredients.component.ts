import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Ingredients, IngredientSelected } from '../types/types';
import { FilterIngredients } from '../pipes/ingredients.pipe';

@Component({
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, FilterIngredients],
  templateUrl: './modal-select-ingredients.component.html',
  styleUrl: './modal-select-ingredients.component.scss',
})
export class ModalSelectIngredientsComponent {
  @Input() ingredients: Ingredients = [];
  @Input() ingredients_selected: IngredientSelected[] = [];

  public search_term: string = '';

  constructor(public _modalController: ModalController) {}

  selectAllIngredients(event: any) {
    const shouldSelect = event.detail.checked;

    if (shouldSelect) {
      const add_all_ingredients = this.ingredients.map(
        (_ingredient: Ingredients[0]) => {
          return {
            id: _ingredient.id,
            name: _ingredient.name,
          };
        }
      );

      this.ingredients_selected.push(...add_all_ingredients);
    } else {
      this.ingredients_selected = [];
    }
  }

  addRemoveIngredient(event: any, ingredient: any) {
    const shouldAdd = event.detail.checked;

    if (shouldAdd) {
      const add_or_remove_ingredient = {
        id: ingredient.id,
        name: ingredient.name,
      };
      this.ingredients_selected.push(add_or_remove_ingredient);
    } else {
      this.ingredients_selected = this.ingredients_selected.filter(
        (_ingredient) => _ingredient.id !== ingredient.id
      );
    }
  }

  isCheckedIngredient(ingredient_id: string) {
    const isChecked = !!this.ingredients_selected.find(
      (_ingrdient) => _ingrdient.id === ingredient_id
    );
    return isChecked;
  }

  confirm_selection() {
    // Cerrar modal

    this._modalController.dismiss(
      {
        ingredients_selected: this.ingredients_selected,
      },
      'confirm'
    );
  }

  search_ingredient(event: any) {
    this.search_term = event.target.value.toLowerCase();
  }

  close() {
    this._modalController.dismiss();
  }
}
