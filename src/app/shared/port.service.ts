import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PortService {

  constructor(private http:HttpClient) { }
  
  getPortList(){
   return this.http.get(environment.apiURL+'/ports').toPromise();
  }

}
