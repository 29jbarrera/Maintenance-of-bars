import { FormControl, Validators } from '@angular/forms';
import { TRPCOutput } from '@komandero/clientTRPC';
import { TypedFormGroup } from '@komandero/web-share';
import { boolean } from 'zod';

export type Category =
  TRPCOutput['organizations']['product_category']['get_by_id']['category'];

export type ProductOfCategory = Category['product'][0];

export type CategoriesThatModifyThis =
  TRPCOutput['organizations']['product_category']['add_categories_that_modify']['add_categories_that_modify'];

export type CategoryThatModifyThis = CategoriesThatModifyThis[0];

export type CategoriesThatUseThis =
  TRPCOutput['organizations']['product_category']['add_categories_that_use']['add_categories_that_use'];

export type CategoryThatUseThis = CategoriesThatUseThis[0];

export interface ProductCategories {
  name: string;
  o: number;
  pi: number;
  not_add_princing: boolean;
  id: string;
}

export type ProductCategoriesForm = TypedFormGroup<ProductCategories>;

export function productCategoriesForm(): ProductCategoriesForm {
  return new TypedFormGroup<ProductCategories>({
    name: new FormControl({ value: '', disabled: true }, [Validators.required]),
    o: new FormControl(0, Validators.required),
    pi: new FormControl(0, Validators.required),
    not_add_princing: new FormControl(<boolean>false, Validators.required),
  });
}
