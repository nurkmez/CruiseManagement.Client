import { Injectable } from '@angular/core';
import { Cruise } from './cruise.model';
import { Ship } from './ship.model';
import { Cruiseline } from './cruiseline.model';
import { Cabintype } from './cabintype.model';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Route } from './route.model';

@Injectable({
  providedIn: 'root'
})
export class CruiseService {

  formData: Cruise;
  routes: Route[];
  apiURL: string = environment.apiURL;
  
  constructor(private http: HttpClient) { }

  getCruiseLines(): Observable<Cruiseline[]> {
    return this.http.get<Cruiseline[]>(this.apiURL + '/cruiselines')
      .pipe(
        catchError(this.handleError<Cruiseline[]>('getCruiseLines', []))
      );
  }


  getCabinTypes(shipId: number): Observable<Cabintype[]> {
    console.log("getShips shipId=" + shipId);
    return this.http.get<Cabintype[]>(this.apiURL + '/cabintypes/' + shipId)
      .pipe(
        catchError(this.handleError<Cabintype[]>('getCabinTypes', []))
      );
  }

  getShips(cruiseLineId: number): Observable<Ship[]> {
    console.log("getShips cruiseLineId=" + cruiseLineId);
    return this.http.get<Ship[]>(this.apiURL + '/ships/' + cruiseLineId)
      .pipe(
        catchError(this.handleError<Ship[]>('getShips', []))
      );
  }



  saveOrUpdateCruise() {
    var body = {
      ...this.formData,
      routes: this.routes
    };
    console.log(body);

    if(this.formData.id>0)
    {
      console.log("for update");
      console.log(body);
      return this.http.post(this.apiURL + '/cruises/'+this.formData.id, body);

    }
    else
    {
      console.log("for insert");
      return this.http.post(this.apiURL + '/cruises', body);
    }
  }

  getCruiseList() {
    return this.http.get(this.apiURL + '/cruises').toPromise();
  }



  getRoutesList(id: number) {
    return this.http.get(this.apiURL + '/cruiseroutes/' + id).toPromise();
  }

  getCruiseByID(id: number): any {
    return this.http.get(this.apiURL + '/cruises/' + id).toPromise();
  }

  deleteCruise(id: number) {
    return this.http.delete(this.apiURL + '/cruises/' + id).toPromise();
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}