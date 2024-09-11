import { AppRouter } from "@komandero/server";
import { inferRouterOutputs } from "@trpc/server";

export type CategoriesQR =
  inferRouterOutputs<AppRouter>['organizations']['qr']['get_categories_of_products'];
export type CategoryQR = CategoriesQR[0];

export type ProductsInCategories = inferRouterOutputs<AppRouter>['organizations']['qr']['get_products_within_category'];
export type ProductInCategory = ProductsInCategories[0];