import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { PetStat } from './PetStat';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PetStatService {
  private urlBase = environment.serverUrl+'/stats';

  constructor(private http: HttpClient) {}

  getStat(stat: PetStat): Observable<number> {
    return this.http.get<number>(this.urlBase + '/' + stat);
  }

  increaseStat(stat: PetStat): Observable<any> {
    return this.http.post<object>(
      this.urlBase + '/increase',
      { stat },
    ).pipe(
      tap((x) => {
        console.log('Fed!')
      }),
      catchError((error, caught) => {
        console.log(error);
        return of();
      })
    );
  }
}
