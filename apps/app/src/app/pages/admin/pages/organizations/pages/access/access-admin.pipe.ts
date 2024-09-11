import { Pipe, PipeTransform } from '@angular/core';
import { stringOneIncludeInStringTwo } from '@komandero/commons';
import { UsersHasAccess } from './types';

@Pipe({
  name: 'FilterAccess',
  standalone: true,
})
export class FilterAccess implements PipeTransform {
  transform(users_has_access: UsersHasAccess, search_term: string): UsersHasAccess {
    if(!users_has_access) return [];

    if(!search_term) return users_has_access;

    return users_has_access.filter((users_has_access:UsersHasAccess[0]) => {
      
      const email = users_has_access.user.email;

      return stringOneIncludeInStringTwo(search_term, email)
    })
  }
}
