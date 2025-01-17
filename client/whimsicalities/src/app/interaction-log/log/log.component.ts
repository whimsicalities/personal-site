import { Component, Input } from '@angular/core';
import InteractionLog from '../InteractionLog';

@Component({
  selector: 'app-log',
  standalone: true,
  imports: [],
  templateUrl: './log.component.html',
  styleUrl: './log.component.scss'
})
export class LogComponent {
  @Input({ required: true }) log!: InteractionLog; // Required, so never null (!)
}
