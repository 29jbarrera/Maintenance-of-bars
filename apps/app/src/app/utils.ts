import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

export type Params = {
  organization_id: string;
  product_id: string;
  category_id: string;
};

export function get_params(route: ActivatedRoute) {
  const params: { [key: string]: string } = structuredClone(
    route.snapshot.params
  );
  // console.log(params);
  let _route = Object.assign(route.snapshot) as ActivatedRouteSnapshot;
  while (_route.parent) {
    _route = Object.assign(_route.parent);
    Object.keys(_route.params).forEach((key) => {
      // Check if exits and trow error if exits
      // if (params[key]) {
      //   throw new Error(`The key ${key} already exits in the params object`);
      // }
      params[key] = _route.params[key];
    });
  }

  return params as Params;
}

export function get_param(route: ActivatedRoute, key: keyof Params) {
  return get_params(route)[key];
}

export function get_organization_id(route: ActivatedRoute) {
  return get_param(route, 'organization_id');
}

export function get_category_id(route: ActivatedRoute){
  return get_param(route, 'category_id');
}

export function get_product_id(route: ActivatedRoute){
  return get_param(route, 'product_id');
}