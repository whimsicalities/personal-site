import { Injectable } from '@angular/core';
import InteractionLog from '../../interaction-log/InteractionLog';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InteractionLogService {
  constructor(private http: HttpClient) {}

  getInteractionLog(): Observable<InteractionLog[]> {
    return this.http.get<InteractionLog[]>(`${environment.serverUrl}/interaction-log`);
  }
}
