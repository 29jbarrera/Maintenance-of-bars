import { TRPCOutput } from '@komandero/clientTRPC';
import { FormControl, Validators } from '@angular/forms';
import { TypedFormGroup } from '@komandero/web-share';

export type Categories =
  TRPCOutput['organizations']['products']['get_all']['categories'];
export type Category = Categories[0];

export interface ProductCategories {
  name: string;
  id: string;
  organization_id: string;
}

export type ProductCategoriesForm = TypedFormGroup<ProductCategories>;

export function productCategoriesForm(): ProductCategoriesForm {
  return new TypedFormGroup<ProductCategories>({
    name: new FormControl('', [Validators.required]),
  });
}
