import type { TRPCOutput } from '@komandero/clientTRPC';

export type Ingredients =
  TRPCOutput['organizations']['ingredients']['get_all']['ingredients'];
export type Ingredient = Ingredients[0];
