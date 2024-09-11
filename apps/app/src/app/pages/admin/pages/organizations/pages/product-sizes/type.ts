import { TRPCOutput } from '@komandero/clientTRPC';
import { FormControl, Validators } from '@angular/forms';
import { TypedFormGroup } from '@komandero/web-share';

export type ProductsList =
  TRPCOutput['organizations']['product_size']['get_all']['product_sizes'];
export type ProductsListItem = ProductsList[0];

export interface product_size {
  name: string;
  qr_o: number;
  id: string;
  organization_id: string;
}

export type ProductSizeForm = TypedFormGroup<product_size>;

export function productSizeForm(): TypedFormGroup<product_size> {
  return new TypedFormGroup<product_size>({
    name: new FormControl('', [Validators.required]),
    qr_o: new FormControl('', [Validators.required]),
  });
}
