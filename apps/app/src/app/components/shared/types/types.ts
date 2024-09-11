import { TRPCOutput } from '@komandero/clientTRPC';

export type IngredientSelected = {
  id: string;
  name: string;
};

export type Ingredients =
  TRPCOutput['organizations']['ingredients']['get_all']['ingredients'];

export type Ingredient = Ingredients[0]