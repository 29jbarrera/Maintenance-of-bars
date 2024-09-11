import { TRPCInput, TRPCOutput } from '@komandero/clientTRPC';
import { FormControl, Validators } from '@angular/forms';
import { TypedFormGroup } from '@komandero/web-share';

export type Product =
  TRPCOutput['organizations']['products']['get_product_by_id']['_product'];

export type ProductModifications = Product['product_modification'];

export type ModifiersAvailablesToAdd =
  TRPCOutput['organizations']['products']['get_all_modifiers'];

export type ProductListIngredients = Product['ingredient_product'];
export type ProductListIngredient = ProductListIngredients[0];


export type GroupsModifications = {
  label: string;
  value: string;
};

export type ItemsModifications = {
  name: string;
  id: string;
  apmg: string;
};

export interface ProductModification {
  apm: string;
  pi: number;
  o: number;
}

export type ProductModificationForm = TypedFormGroup<ProductModification>;

export function productModificationForm(): ProductModificationForm {
  return new TypedFormGroup<ProductModification>({
    apm: new FormControl('', [Validators.required]),
    pi: new FormControl(0, [Validators.required, Validators.min(0)]),
    o: new FormControl(0, [Validators.required, Validators.min(0)]),
  });
}


export interface IngredientProduct {
  ingredient_id: string;
  product_id: string;
  price: number;
}

export type IngredientProductForm = TypedFormGroup<IngredientProduct>;

export function ingredientProductForm(): IngredientProductForm {
  return new TypedFormGroup<IngredientProduct>({
    ingredient_id: new FormControl(''),
    product_id: new FormControl(''),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
  });
}




export interface ProductModificationEditPriceAndOrder {
  p_id: string;
  apm: string;
  pi: number;
  o: number;
}

export type ProductModificationEditPriceAndOrderForm = TypedFormGroup<ProductModificationEditPriceAndOrder>;

export function productModificationEditPriceAndOrderForm(): ProductModificationEditPriceAndOrderForm {
  return new TypedFormGroup<ProductModificationEditPriceAndOrder>({
    p_id: new FormControl(''),
    apm: new FormControl(''),
    pi: new FormControl(0, [Validators.required, Validators.min(0)]),
    o: new FormControl(0, [Validators.required, Validators.min(0)]),
  });
}