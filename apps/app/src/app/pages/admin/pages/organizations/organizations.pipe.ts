import { Pipe, PipeTransform } from '@angular/core';
import { stringOneIncludeInStringTwo } from '@komandero/commons';
import { OrganizationList, OrganizationListItem } from './types';


@Pipe({
    name: 'filterOrganizations',
    standalone: true,
})
export class FilterOrganizations implements PipeTransform {
    transform(organizations: OrganizationList, search_term: string): OrganizationList {
        if(!organizations) return [];

        if(!search_term) return organizations;

        return organizations.filter((organization: OrganizationListItem) => {

            const name = organization.name;

            return stringOneIncludeInStringTwo(search_term, name);

        })
    }
}