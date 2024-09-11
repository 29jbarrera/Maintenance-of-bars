import { FormControl, Validators } from '@angular/forms';
import { TRPCOutput } from '@komandero/clientTRPC';
import { TypedFormGroup } from '@komandero/web-share';

export type UsersTable = TRPCOutput['admin']['users']['get_users']['users'];
export type UserTable = UsersTable[0];

export type ViewUser = TRPCOutput['admin']['users']['view_user'];
export type ViewUserUser = ViewUser['user'];
export type ViewUserOrganizationsHaveAccess =
  ViewUser['organizations_have_access'];
export type ViewUserOrganizationAccess = ViewUserOrganizationsHaveAccess[0];

export type Organizations =
  TRPCOutput['admin']['users']['get_organizations_to_add_user']['organizations'];

// INTERFAZ EDITAR USUARIO
export interface EditUser {
  id: string;
  uid: string;
  email: string;
  displayName: string;
}

export type EditUserForm = TypedFormGroup<EditUser>;

export function editUserForm(): TypedFormGroup<EditUserForm> {
  return new TypedFormGroup<EditUserForm>({
    id: new FormControl('', [Validators.required]),
    uid: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    displayName: new FormControl('', [Validators.required]),
  });
}

// INTERFAZ CREAR USUARIO
export interface CreateUser {
  email: string;
  displayName: string;
  password: string;
}

export type CreateUserForm = TypedFormGroup<CreateUser>;

export function createUserForm(): TypedFormGroup<CreateUser> {
  return new TypedFormGroup<CreateUser>({
    email: new FormControl('', [Validators.required]),
    displayName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
}

//INTERFAZ ADD ORGANIZATION
export interface AddOrganization {
  id: string;
}
export type AddOrganizationForm = TypedFormGroup<AddOrganization>;

export function addOrganizationForm(): TypedFormGroup<AddOrganization> {
  return new TypedFormGroup<AddOrganization>({
    id: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });
}
