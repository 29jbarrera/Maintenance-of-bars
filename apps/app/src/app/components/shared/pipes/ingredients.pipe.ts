import { Pipe, PipeTransform } from '@angular/core';
import { stringOneIncludeInStringTwo } from '@komandero/commons';
import { Ingredient, Ingredients } from '../types/types';



@Pipe({
    name: 'filterIngredients',
    standalone: true,
})
export class FilterIngredients implements PipeTransform {
    transform(ingredients: Ingredients, search_term: string): Ingredients {
        if(!ingredients) return [];

        if(!search_term) return ingredients;

        return ingredients.filter((ingredient: Ingredient) => {

            const {name} = ingredient;

            return stringOneIncludeInStringTwo(search_term, name);

        })
    }
}