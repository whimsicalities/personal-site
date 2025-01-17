import { Component, inject, OnInit } from '@angular/core';
import InteractionLog from './InteractionLog';
import { LogComponent } from './log/log.component';
import { Observable } from 'rxjs';
import { InteractionLogService } from '../services/interaction-log/interaction-log.service';

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
  private interactionLogService = inject(InteractionLogService);

  interactions$!: Observable<InteractionLog[]>;

  logs: InteractionLog[] = new Array<InteractionLog>();
  ngOnInit(): void {
    this.interactions$ = this.interactionLogService.getInteractionLog();
    this.interactions$.subscribe(
      (value) => {
        this.logs = value;
      }
    );
  }
}
