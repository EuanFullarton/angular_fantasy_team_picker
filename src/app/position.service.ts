import { Injectable } from '@angular/core';
import { Position } from './position';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(
    private http: HttpClient
  ) { }

  private positionsUrl = '/api/positions'

  getPositions(): Observable<Position[]> {
    return this.http.get<Position[]>(this.positionsUrl, httpOptions)
      .pipe(
        catchError(this.handleError('getPositions', []))
      );
  }

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {

        console.error(error); // log to console instead

        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }
}
