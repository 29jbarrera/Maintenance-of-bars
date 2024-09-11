import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

@Component({
  template: '',
  standalone: true,
  imports: [CommonModule],
})
export class FilterCommonClass {
  @ViewChild('dt') dt!: Table;

  filtersBetweenDates(dates: any) {
    const { _from, _to } = dates;

    this.dt.filters['created_at'] = [
      {
        matchMode: 'gte',
        operator: 'and',
        value: _from,
      },
      {
        matchMode: 'lte',
        operator: 'and',
        value: _to,
      },
    ];

    this.dt._filter();
  }

  cleanFilterDates() {
    if (this.dt.filters['created_at']) {
      delete this.dt.filters['created_at'];
      this.dt._filter();
    }
  }
}
