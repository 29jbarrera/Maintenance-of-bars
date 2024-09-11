import { Pipe, PipeTransform } from '@angular/core';
import { Clientes } from './type';
import { stringOneIncludeInStringTwo } from '@komandero/commons';

@Pipe({
  name: 'Filterclient',
  standalone: true,
})
export class FilterClientesPipe implements PipeTransform {
  transform(clientes: Clientes, search_term: string): Clientes {
    if (!clientes) return [];

    if (!search_term) return clientes;

    return clientes.filter((clientes: Clientes[0]) => {
      const name = clientes.name;
      const nif = clientes.nif;

      return (
        stringOneIncludeInStringTwo(search_term, name) ||
        stringOneIncludeInStringTwo(search_term, nif)
      );
    });
  }
}
