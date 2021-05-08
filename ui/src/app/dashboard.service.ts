import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dashboard } from './Dashboard';
import { DailyData } from './DailyData';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http:HttpClient) { }
  getData() : Observable<Dashboard[]>{
    const body = { param : "so2", data_date : "2021-03-02", pos : "bottom"};
    return this.http.post<Dashboard[]>("http://localhost:5000/openaq/topCitiesByParam", body);
}

getAllData() : Observable<DailyData[]>{
  const body = {
    param : ["so2", "co", "pm10", "pm25"],
    data_date : "2021-03-02",
    pos : "bottom"
};
  return this.http.post<DailyData[]>("http://localhost:5000/openaq/topCitiesAllParamByDate", body);
}

}
