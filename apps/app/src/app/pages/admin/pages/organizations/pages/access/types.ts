import { TRPCOutput } from '@komandero/clientTRPC';

export type AppRoles =
  TRPCOutput['organizations']['access']['get_all']['app_roles'];

export type AppRol = AppRoles[0];

export type UsersHasAccess =
  TRPCOutput['organizations']['access']['get_all']['users_has_access'];

export type UserHasAccess = UsersHasAccess[0];

export type OrganizationName = TRPCOutput['organizations']['access']['get_all']['organization_name'];

