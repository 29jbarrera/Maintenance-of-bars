import { TRPCInput, TRPCOutput } from '@komandero/clientTRPC';
import { FormControl, Validators } from '@angular/forms';
import { TypedFormGroup } from '@komandero/web-share';

export type ProductsList =
  TRPCOutput['organizations']['products']['get_all']['products'];
export type ProductsListItem = ProductsList[0];

export type ProductSize =
  TRPCOutput['organizations']['products']['get_product_by_id']['product_size_price'];

export type UpdatedProductSizePrice =
  TRPCInput['organizations']['products']['edit_product_size_price'];

export type DeleteProductSizeToProduct =
  TRPCInput['organizations']['products']['delete_product_size_prices'];

export type AllProductSizesOrganization =
  TRPCOutput['organizations']['product_size']['get_all']['product_sizes'];

export type AddProductSizeToProduct =
  TRPCInput['organizations']['products']['add_product_size_to_product'];

export type Categories =
  TRPCOutput['organizations']['products']['get_all']['categories'];
export type Category = Categories[0];

export type FilterSizeSelected = 'all' | 'with_size' | 'without_size';

export type FilterModifierSelected =
  | 'all'
  | 'with_modifier'
  | 'whithout_modifier';

export interface Product {
  name: string;
  name_i: string;
  product_category_id: string;
  price_take_away: number;
  price_delivery: number;
  price_pick_up: number;
  organization_id: string;
  id: string;
}

export type ProductForm = TypedFormGroup<Product>;

export function productForm(): ProductForm {
  return new TypedFormGroup<Product>({
    name: new FormControl('', [Validators.required]),
    name_i: new FormControl(''),
    product_category_id: new FormControl('', [Validators.required]),
    price_take_away: new FormControl('', [
      Validators.required,
      Validators.min(0),
    ]),
    price_delivery: new FormControl('', [
      Validators.required,
      Validators.min(0),
    ]),
    price_pick_up: new FormControl('', [
      Validators.required,
      Validators.min(0),
    ]),
    organization_id: new FormControl(''),
    id: new FormControl(''),
  });
}

export interface SizeAddorEdit {
  product_id: string;
  product_size_id: string;
  price: number;
}
export type AddOrEditProductSize = TypedFormGroup<SizeAddorEdit>;

export function addOrEditProductSize(): AddOrEditProductSize {
  return new TypedFormGroup<SizeAddorEdit>({
    product_id: new FormControl(''),
    product_size_id: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
  });
}

export interface OrderAndVisualization {
  priority: number;
  priority_ko: number;
  priority_u: number;
  qr_o: number;
  w_v: boolean;
}

export type OrderAndVisualizationForm = TypedFormGroup<OrderAndVisualization>;

export function orderAndVisualizationForm(): OrderAndVisualizationForm {
  return new TypedFormGroup<OrderAndVisualization>({
    priority: new FormControl('', [Validators.required]),
    priority_ko: new FormControl('', [Validators.required]),
    priority_u: new FormControl('', [Validators.required]),
    qr_o: new FormControl('', [Validators.required]),
    w_v: new FormControl('', [Validators.required]),
  });
}
