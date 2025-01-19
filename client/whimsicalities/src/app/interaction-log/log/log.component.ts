import { Component, Input } from '@angular/core';
import InteractionLog from '../InteractionLog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-log',
  standalone: true,
  imports: [ DatePipe ],
  templateUrl: './log.component.html',
  styleUrl: './log.component.scss'
})
export class LogComponent {
  @Input({ required: true }) log!: InteractionLog; // Required, so never null (!)
}
