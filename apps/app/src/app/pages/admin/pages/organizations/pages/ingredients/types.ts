import type { TRPCOutput } from '@komandero/clientTRPC';
import { FormControl, Validators } from '@angular/forms';
import { TypedFormGroup } from '@komandero/web-share';

export interface TypeIngredient {
  id: string;
  name: string;
  organization_id: string;
}

export type IngredientForm = TypedFormGroup<TypeIngredient>;

export function ingredientForm(): IngredientForm {
  return new TypedFormGroup<TypeIngredient>({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    organization_id: new FormControl(''),
  });
}
