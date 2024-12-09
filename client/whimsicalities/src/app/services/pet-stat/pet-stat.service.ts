import { HttpClient } from '@angular/common/http';
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
    return this.http.get<number>(this.urlBase + '/' + PetStat[stat]);
  }

  increaseStat(stat: PetStat): Observable<string> {
    return this.http.post(
      this.urlBase + '/increase',
      { stat: PetStat[stat] },
      {
        responseType: 'text'
      }
    ).pipe(
      tap(() => {
        console.log('Increased stat')
      }),
      catchError((error) => {
        console.log(error);
        return of();
      })
    );
  }
}
