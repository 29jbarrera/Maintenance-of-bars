import { TRPCOutput } from '@komandero/clientTRPC';
import { FormControl, Validators } from '@angular/forms';
import { TypedFormGroup } from '@komandero/web-share';

export type Clientes =
  TRPCOutput['organizations']['clients']['get_all']['clients'];
export type Cliente = Clientes[0];

export interface Client {
  name: string;
  nif: string;
  phone: string;
  email: string;
  id: string;
  organization_id: string;
  address: string;
  cp: string;
  locality: string;
  province: string;
}

export type ClientForm = TypedFormGroup<Client>;

export function client_form(): ClientForm {
  return new TypedFormGroup<Client>({
    name: new FormControl('', [Validators.required]),
    nif: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl(''),
    phone: new FormControl(''),
    cp: new FormControl(''),
    locality: new FormControl(''),
    province: new FormControl(''),
  });
}
