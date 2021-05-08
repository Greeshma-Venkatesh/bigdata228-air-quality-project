import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dashboard } from './Dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http:HttpClient) { }
  getData() : Observable<Dashboard[]>{
    const body = { param : "so2", data_date : "2021-03-02"};
    return this.http.post<Dashboard[]>("http://localhost:5000/openaq/topCitiesByParam", body);
}
}
