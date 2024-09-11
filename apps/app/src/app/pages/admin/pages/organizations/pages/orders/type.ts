import type { TRPCOutput } from '@komandero/clientTRPC';

export type Orders =
  TRPCOutput['organizations']['orders']['order_of_organization']['orders'];
export type Order = Orders[0];

export type CartProducts = any[];
export type CartProduct = any;

export type EatingTableGroups =
  TRPCOutput['organizations']['orders']['order_of_organization']['eating_tables_groups'];
export type EatingTableGroup = EatingTableGroups[0];

export type Users =
  TRPCOutput['organizations']['orders']['order_of_organization']['users'];

export type User = Users[0];

export type EatingTables =
  TRPCOutput['organizations']['orders']['order_of_organization']['eating_tables'];

export type EatingTable = EatingTables[0];
