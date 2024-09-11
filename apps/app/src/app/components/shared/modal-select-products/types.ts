import { clientAdminTrpc, TRPCInput, TRPCOutput } from '@komandero/clientTRPC';

export type ProductCategories =
  TRPCOutput['organizations']['share']['select_products']['categories'];

export type ProductCategory = ProductCategories[0];

export type Products = ProductCategory['product'];
export type Product = Products[0];
