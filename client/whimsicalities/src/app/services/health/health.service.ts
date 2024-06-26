import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HealthService {
  constructor(private http: HttpClient) { }

  healthCheck(): Observable<boolean> {
    return this.http.get<boolean>('localhost:3000/healthcheck')
  }
}
