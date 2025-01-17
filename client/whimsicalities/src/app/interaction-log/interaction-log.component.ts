import { Component, inject, OnInit } from '@angular/core';
import InteractionLog from './InteractionLog';
import { LogComponent } from './log/log.component';
import { Observable } from 'rxjs';
import { InteractionLogService } from '../services/interaction-log/interaction-log.service';
import { io } from 'socket.io-client';
import { environment } from '../../environments/environment';
import { PetStat } from '../services/pet-stat/PetStat';

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

  /**
   * On any websocket stat updates, pull logs again
   */
  socketConnect(): void {
    const socket = io(environment.serverUrl);
    socket.on(PetStat[PetStat.Food], () => {
      this.refreshLogs();
    });
    socket.on(PetStat[PetStat.Fun], () => {
      this.refreshLogs();
    });
  }

  refreshLogs(): void {
    this.interactions$ = this.interactionLogService.getInteractionLog();
    this.interactions$.subscribe(
      (value) => {
        this.logs = value;
      }
    );
  }

  logs: InteractionLog[] = new Array<InteractionLog>();
  ngOnInit(): void {
    this.refreshLogs();
    this.socketConnect();
  }
}
