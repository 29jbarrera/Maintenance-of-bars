import { FormControl, Validators } from '@angular/forms';
import { TRPCOutput } from '@komandero/clientTRPC';
import { TypedFormGroup } from '@komandero/web-share';

export type OrganizationInfo =
  TRPCOutput['organizations']['view_organization']['organization'];

export type UsersTable = TRPCOutput['admin']['users']['get_users']['users'];
export type UserTable = UsersTable[0];

export type UsersHaveAccess =
  TRPCOutput['organizations']['view_organization']['users_have_access'];
export type UserHaveAccess = UsersHaveAccess[0];

export type ModuleItem = {
  name: string;
  path: string;
};

export const MODULES_ORGANIZATION: ModuleItem[] = [
  { name: 'accesos', path: 'access' },
  { name: 'encabezado ticket', path: 'printer-config' },

  { name: 'categorías de productos', path: 'product-categories' },
  { name: 'tamaños de productos', path: 'product-sizes' },
  { name: 'productos', path: 'products' },
  { name: 'orden productos', path: 'products-reorder' },

  { name: 'komanderos', path: 'commander' },
  { name: 'qr', path: 'qr' },
  { name: 'oidokocina', path: 'oidokocina' },
  {
    name: 'oidokocina de la organización',
    path: 'organization-oidokocina',
  },
  {
    name: 'configuración mesas',
    path: 'eating-tables-configuration',
  },
  { name: 'pedidos', path: 'orders' },
  { name: 'tickets', path: 'printer-jobs' },
  { name: 'facturas', path: 'invoices' },

  { name: 'clientes', path: 'client' },

  { name: 'ingredientes', path: 'ingredients' },
  {
    name: 'configuración masiva ingredientes',
    path: 'ingredients-masive-config',
  },
  {
    name: 'ingredientes productos',
    path: 'configuration-ingredients-product',
  },
];

export interface Organization {
  id: string;
  name: string;
  billing_identifier: string;
  billing_name: string;
  billing_address: string;
}
export type EditOrganizationForm = TypedFormGroup<Organization>;

export function OrganizationForm(): EditOrganizationForm {
  return new TypedFormGroup<Organization>({
    id: new FormControl('', [Validators.required, Validators.minLength(1)]),
    name: new FormControl('', [Validators.required, Validators.minLength(1)]),
    billing_identifier: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    billing_name: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    billing_address: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
  });
}
