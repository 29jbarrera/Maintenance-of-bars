import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-ticket-preview',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './ticket-preview.component.html',
  styleUrl: './ticket-preview.component.scss',
})
export class TicketPreviewComponent {
  @Input() lines!: any;
  @Input() errorMsg: string = '';
  @Input() editMode: boolean = false;
  @Output() point_line: EventEmitter<number> = new EventEmitter<number>();

  getLinesToPrint() {
    return this.lines || [];
  }

  getText(text: any) {
    if (!text) {
      return '';
    }
    return text;
  }

}
