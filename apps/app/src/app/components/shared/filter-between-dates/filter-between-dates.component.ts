import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-between-dates',
  standalone: true,
  imports: [CommonModule, IonicModule, CalendarModule, FormsModule],
  templateUrl: './filter-between-dates.component.html',
  styleUrl: './filter-between-dates.component.scss',
})
export class FilterBetweenDatesComponent {


  public from_date!: Date | any;
  public to_date!: Date | any;

  @Output() filters_between_dates: EventEmitter<any> = new EventEmitter<any>();
  @Output() clean_filter_dates: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    const today = new Date();
    const from_date = new Date();
    from_date.setMonth(today.getMonth() - 1);

    this.from_date = from_date;
    this.to_date = today;
  }

  filterBetweenDates() {
    if (!this.from_date && !this.to_date) return;

    let _from = new Date(this.from_date).getTime();
    let _to = new Date(this.to_date).getTime();

    this.filters_between_dates.emit({_from, _to});
  }

  cleanFilterDates(){
    this.from_date = null;
    this.to_date = null;
    this.clean_filter_dates.emit();
  }


}
