import { Component, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header-app',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './header-app.component.html',
  styleUrl: './header-app.component.scss',
})
export class HeaderAppComponent {
  @Input() title: string = '';
  @Input() can_back: boolean = false;
  @Output() go_back: EventEmitter<any> = new EventEmitter<any>();

}
