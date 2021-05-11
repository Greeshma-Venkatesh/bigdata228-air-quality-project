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

getAllData(date) : Observable<DailyData[]>{
  console.log(date);
  const body = {
    param : ["so2", "co", "pm10", "pm25"],
    data_date : date,
    pos : "bottom"
};
  return this.http.post<DailyData[]>("http://localhost:5000/openaq/topCitiesAllParamByDate", body);
}

getWeeklyData(startDate, endDate) : Observable<DailyData[]>{
  
  const body = {
    param: ["so2", "co", "pm10", "pm25"],
    start_date:startDate,
    end_date:endDate,
    pos: "bottom"
};
  return this.http.post<DailyData[]>("http://localhost:5000/openaq/topCitiesAllParamBetweenDates", body);
}

getWeeklyChartData(startDate, endDate) : Observable<any>{
  
  const body = {
    param: ["so2", "co", "pm10", "pm25"],
    start_date:startDate,
    end_date:endDate,
    pos: "bottom"
};
  return this.http.post<any>("http://localhost:5000/openaq/topCitiesDataUiChartWeekly", body);
}
}
