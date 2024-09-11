import { Pipe, PipeTransform } from '@angular/core';
import { cent_to_eur_format } from '@komandero/commons';

@Pipe({
  name: 'centToEur',
  standalone: true,
  pure: true,
})
export class CentToEurPipe implements PipeTransform {
  transform(value: number): string {
    return cent_to_eur_format(value);
  }
}
