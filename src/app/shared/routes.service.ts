import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  constructor(private http:HttpClient) { }

  getPortList(){
    console.log("getPortList is called.")
    return this.http.get(environment.apiURL+'/ports').toPromise();
   }
}
