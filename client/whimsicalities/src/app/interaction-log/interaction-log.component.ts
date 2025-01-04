import { Component, OnInit } from '@angular/core';
import Log from './Log';
import { LogComponent } from './log/log.component';

@Component({
  selector: 'app-interaction-log',
  standalone: true,
  imports: [
    LogComponent
  ],
  templateUrl: './interaction-log.component.html',
  styleUrl: './interaction-log.component.scss'
})
export class InteractionLogComponent implements OnInit {
  logs: Log[] = new Array<Log>();
  ngOnInit(): void {
    for (let i=0; i<10; i++) {
      this.logs.push({
        date: Date.now(),
        uuid: crypto.randomUUID(), // TODO This is no good on production since the site is not https but it will do for prototyping
        message: "Someone did something"
      });
    }
  }
}
