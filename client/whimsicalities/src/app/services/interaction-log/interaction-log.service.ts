import { Injectable } from '@angular/core';
import InteractionLog from '../../interaction-log/InteractionLog';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

type InteractionLogResponse =
  {
    log_id: string,
    time: string,
    message: string,
  }[];

@Injectable({
  providedIn: 'root'
})
export class InteractionLogService {
  constructor(private http: HttpClient) {}

  getInteractionLog(): Observable<InteractionLog[]> {
    return this.http.get<InteractionLogResponse>(`${environment.serverUrl}/interaction-log`)
      .pipe(
        map(response => {
          return response.map(log => {
            return {
              logId: log.log_id,
              time: new Date(log.time),
              message: log.message,
            };
          });
        }),
      );
  }
}
