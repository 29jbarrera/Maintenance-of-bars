import { FormControl, Validators } from '@angular/forms';
import { TRPCOutput } from '@komandero/clientTRPC';
import { TypedFormGroup } from '@komandero/web-share';

export type ProductModificationsGroups =
  TRPCOutput['admin']['app_configs']['product_modification_group']['app_product_modifications_groups'];

export type GroupSelected = ProductModificationsGroups[0];

export type Group = GroupSelected;

export type ProductModifications =
  TRPCOutput['admin']['app_configs']['product_modifications_of_group']['app_product_modifications'];

export type Product = ProductModifications[0];

export type Modification = Product;

//Editar Modificador Producto Grupo
export interface ProductModificationGroup {
  id: number;
  name: string;
}

export type ProductModifcationGroupForm =
  TypedFormGroup<ProductModificationGroup>;

export function productModifcationGroupForm(): ProductModifcationGroupForm {
  return new TypedFormGroup<ProductModifcation>({
    id: new FormControl(0, [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });
}

//Añadir Modificador Producto al Grupo
export interface ProductModifcation {
  id: number;
  name: string;
  apmg: number;
}

export type ProductModifcationForm = TypedFormGroup<ProductModifcation>;

export function productModifcationForm(): ProductModifcationForm {
  return new TypedFormGroup<ProductModifcation>({
    id: new FormControl(0, [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    apmg: new FormControl(0, [Validators.required]),
  });
}
