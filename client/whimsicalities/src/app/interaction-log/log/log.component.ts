import { Component, Input } from '@angular/core';
import Log from '../Log';

@Component({
  selector: 'app-log',
  standalone: true,
  imports: [],
  templateUrl: './log.component.html',
  styleUrl: './log.component.scss'
})
export class LogComponent {
  @Input({ required: true }) log!: Log; // Required, so never null (!)
}
