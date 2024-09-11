import { FormControl, Validators } from '@angular/forms';
import { TRPCOutput } from '@komandero/clientTRPC';
import { TypedFormGroup } from '@komandero/web-share';

export type UsersTable = TRPCOutput['admin']['users']['get_users']['users'];
export type UserTable = UsersTable[0];

export type ViewUser = TRPCOutput['admin']['users']['view_user']['organizations_have_access'];
export type ViewUserOrganizationsHaveAccess =ViewUser[0]


export type OrganizationList =
  TRPCOutput['organizations']['get_all']['organizations'];

export type OrganizationListItem = OrganizationList[0];

export function order_product_to_waiter(p1: any, p2: any): number {
  return p1['priority_u'] > p2['priority_u'] ? 1 : -1;
}

//INTERFAZ ADD ORGANIZATION
export interface AddOrganization {
  name: string;
}
export type AddOrganizationForm = TypedFormGroup<AddOrganization>;

export function addOrganizationForm(): AddOrganizationForm {
  return new TypedFormGroup<AddOrganization>({
    name: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });
}
