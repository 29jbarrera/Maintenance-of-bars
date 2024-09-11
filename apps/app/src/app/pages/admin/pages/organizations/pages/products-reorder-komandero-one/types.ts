import { TRPCOutput } from '@komandero/clientTRPC';
import { PriorityType } from '@komandero/commons';
export type ProductsToReorder =
  TRPCOutput['organizations']['products']['get_all_to_reorder'];
export type ProductToReorder = ProductsToReorder[0];

export function reorder_products_by_priority(
  products: ProductToReorder[],
  priority_type: PriorityType
) {
  // Make deep copy
  const _products = JSON.parse(JSON.stringify(products)) as ProductToReorder[];
  return _products.sort((a, b) => {
    return a[priority_type] - b[priority_type];
  });
}
