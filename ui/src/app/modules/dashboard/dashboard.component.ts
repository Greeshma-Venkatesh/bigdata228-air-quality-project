import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/dashboard.service';
//import { DatePipe } from '@angular/common'
import { Dashboard} from 'src/app/Dashboard';
import { Chart } from 'chart.js';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import {FormControl} from '@angular/forms';
import * as moment from 'moment';
import { DatePipe } from '@angular/common'
import { Dataset } from 'src/app/Dataset';
import { DailyData } from 'src/app/DailyData';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dashboard:Dashboard[];
  dashboard2:Dashboard[];
  dashboard3:Dashboard[];
  dashboard4:Dashboard[];
  dailydata:DailyData[];
  weeklydata:DailyData[];
  chartOne;
  chartTwo;
  chartThree;
  chartFour;
  chartWeek;
  weeksForUi=[];
  defaultTodayDate = new FormControl(this.getTodaysDate());
  currentWeek= new FormControl();

  constructor(private service: DashboardService, private datePipe: DatePipe) {
   
  }

  ngOnInit(): void {

    this.getWeeksRange();
    
    let currentWeek = this.currentWeek.value;
    let currentWeekSplit = currentWeek.split(" - ");
    let startDate = this.datePipe.transform(new Date(currentWeekSplit[0]), "yyyy-MM-dd");
    let endDate = this.datePipe.transform(new Date(currentWeekSplit[1]), "yyyy-MM-dd");
    
    console.log(startDate);
    console.log(endDate);
   

    var labels  = new Array;
    var data  = new Array;
    var labelTwo  = new Array;
    var dataTwo  = new Array;
    var labelThree  = new Array;
    var dataThree  = new Array;
    var labelFour  = new Array;
    var dataFour  = new Array;
    //This will get data from API(dashboard.service.ts) and stores it in dashboard variable, make use of this variable for the API data

    this.service.getAllData("2021-03-02").subscribe(dailydataapi => {
      this.dailydata = dailydataapi;
      console.log('FETCHED DAILY DATA:', this.dailydata);
      this.dailydata.forEach(element => {
        if(element.param == "co") {
          this.dashboard2 = element.data;
          this.dashboard2.forEach(dataparam => {
            labelTwo.push(dataparam.city);
            dataTwo.push(dataparam.aqi);
          });
        } else if(element.param == "so2") {
          this.dashboard = element.data;
          this.dashboard.forEach(element => {
            labels.push(element.city);
            data.push(element.aqi);
          });
        } else if(element.param == "pm10") {
          this.dashboard3 = element.data;
          this.dashboard3.forEach(element => {
            labelThree.push(element.city);
            dataThree.push(element.aqi);
          });
        } else if(element.param == "pm25") {
          this.dashboard4 = element.data;
          this.dashboard4.forEach(element => {
            labelFour.push(element.city);
            dataFour.push(element.aqi);
          });
        }
      });

      this.chartOne = new Chart('chartOne', this.createChartOne("bar", labels, data, "#65ba68"));
      this.chartTwo = new Chart('chartTwo', this.createChartOne("bar", labelTwo, dataTwo, "#ffa624"));
      this.chartThree = new Chart('chartThree', this.createChartOne("bar", labelThree, dataThree, "#ef524f"));
      this.chartFour = new Chart('chartFour', this.createChartOne("bar", labelFour, dataFour, "#3366ff"));
    });

    let datasets = new Array();
    let labels12= ["param1", "param2", "param3", "parma4", "param5"];
    this.service.getWeeklyChartData("2021-04-01", "2021-04-02").subscribe(weeklydataapi => {
      let labels12= ["param1", "param2", "param3", "parma4", "param5"];
      console.log("weekdata");
      console.log(weeklydataapi);
      this.weeklydata = weeklydataapi;
    });

   

    
    let dataset1: Dataset = new Dataset();
    dataset1.label = "Chicago";
    dataset1.data = [10, 19, 3, 5, 2];
    dataset1.backgroundColor = "#90c388";

    let dataset2: Dataset = new Dataset();
    dataset2.label = "New York";
    dataset2.data = [20, 29, 23, 25, 22];
    dataset2.backgroundColor = "#b3c6ff";

    let dataset3: Dataset = new Dataset();
    dataset3.label = "Las Vegas";
    dataset3.data = [30, 39, 33, 35, 32];
    dataset3.backgroundColor = "#ffb3d9";

    let dataset4: Dataset = new Dataset();
    dataset4.label = "San Francisco";
    dataset4.data = [40, 49, 43, 45, 42];
    dataset4.backgroundColor = "#ffa64d";

    let dataset5: Dataset = new Dataset();
    dataset5.label = "San Diego";
    dataset5.data = [40, 49, 43, 45, 42];
    dataset5.backgroundColor = "#1ab2ff";

    datasets.push(dataset1);
    datasets.push(dataset2);
    datasets.push(dataset3);
    datasets.push(dataset4);
    datasets.push(dataset5);

    this.chartWeek = new Chart('chartWeek', this.createWeekCharts("bar", labels12,datasets));
  }

  createWeekCharts(type, labels, datasets ){
    return {
    type: type,
    options: {
      responsive: true,
      title: {
        display: false,
        text: ''
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false,
            fontFamily: "'Times New Roman',  Helvetica, sans-serif",
            fontColor: "#394454",
            fontSize: 13
        },
        gridLines: {
          display: false
        }
        }],
        xAxes: [{
          ticks: {
            fontFamily: "'Times New Roman',  Helvetica, sans-serif",
            fontColor: "#394454",
            fontSize: 13
           // fontColor: "#cdf6bc",
           // fontColor: "#999999",
           // fontSize: 13
        },
       
        gridLines: {
          display: true
        }
        }]
      },
      
      legend: {
        display: true,
        fontFamily: "'Times New Roman',  Helvetica, sans-serif",
        position:"top"
      },
    },
    data: {
    //  labels: ["11/01/2020", "11/02/2020", "11/03/2020", "11/04/2020", "11/05/2020", "11/06/2020", "11/07/2020", "Total"],
    labels:labels,
    datasets: datasets,
     /* datasets: [{
        label: 'Naveen',
        data: [10, 19, 3, 5, 2, 3,4,],
        backgroundColor:"#90c388"
      },
      {
        label: 'Varma',
        data: [15, 19, 3, 5, 2, 3, 4, 20],
        backgroundColor:"#a0cc99"
      },
      {
        label: 'Nv',
        data: [10, 19, 3, 5, 2, 3,8, 30],
        backgroundColor:"#b0d4aa"
      }
    ]
    */

    }
  }
  }

  getWeeksRange(){
    let startDate = moment('2020-10-15').startOf('week').format('YYYY/MM/DD');
   // let endDate = moment('2020-11-15').startOf('week').format('YYYY/MM/DD');
    let endDate = moment(new Date()).startOf('week').format('YYYY/MM/DD');
    
    const weeks = [];
    while (startDate <= endDate) {
      weeks.push(startDate);
      startDate = moment(startDate).add(7, 'days').format('YYYY/MM/DD');
    }
    
    for(let i=0;i<weeks.length;i++){
      let we = weeks[i];
      if(weeks[i+1]){
        let date =  new Date(weeks[i+1]);
        date.setDate(date.getDate() - 1);
        we = this.datePipe.transform(we, "MM/dd/yyyy") + " - " + this.datePipe.transform(date, "MM/dd/yyyy");
        this.weeksForUi.push(we);
      }
    }
    this.weeksForUi = this.weeksForUi.reverse();
    this.currentWeek = new FormControl(this.weeksForUi[0]);
    return this.weeksForUi;

  }

  onWeekChange(ob) {
    //  console.log('Book changed...');
      let selectedBook = ob.value;
      console.log(selectedBook)
      let datasets = new Array();
      let labels12= ["param1", "param2", "param3", "parma4", "param5"];
    let dataset1: Dataset = new Dataset();
    dataset1.label = "Bangalore";
    dataset1.data = [40, 49, 43, 45, 42];
    dataset1.backgroundColor = "#90c388";

    let dataset2: Dataset = new Dataset();
    dataset2.label = "Delhi";
    dataset2.data = [20, 29, 23, 25, 22];
    dataset2.backgroundColor = "#b3c6ff";

    let dataset3: Dataset = new Dataset();
    dataset3.label = "Mumbai";
    dataset3.data = [30, 39, 33, 35, 32];
    dataset3.backgroundColor = "#ffb3d9";

    let dataset4: Dataset = new Dataset();
    dataset4.label = "Chennai";
    dataset4.data = [40, 49, 43, 45, 42];
    dataset4.backgroundColor = "#ffa64d";

    let dataset5: Dataset = new Dataset();
    dataset5.label = "Calcutta";
    dataset5.data = [100, 190, 30, 50, 20];
    
    dataset5.backgroundColor = "#1ab2ff";

    datasets.push(dataset1);
    datasets.push(dataset2);
    datasets.push(dataset3);
    datasets.push(dataset4);
    datasets.push(dataset5);
      this.updateWeekCharts(this.chartWeek, labels12, datasets)

  }

  createChartOne(type, labels, data, color ){
    return {
    type: type,
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'AQI'
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            fontColor: "#767676",
              fontFamily: "'Times New Roman',  Helvetica, sans-serif",
              fontSize: 13
        },
        gridLines: {
          display: true
        }
        }],
        xAxes: [{
          ticks: {
            display:true,
            fontFamily: "'Times New Roman',  Helvetica, sans-serif",
              fontColor: "#767676",
              fontSize: 13
        },
        //barPercentage: 0.8,
        //maxBarThickness: 100,
       
        gridLines: {
          display: false
        }
        }]
      },
      
      legend: {
        display: false,
        fontFamily: "'Times New Roman',  Helvetica, sans-serif",
        position:"top"
      },
    },
    data: {
      labels: labels,
    
      datasets: [{
        label: 'Steps',
        data: data,
        //backgroundColor:"rgb(251, 171, 24, 0.4)",
        backgroundColor:color,
        borderWidth: 0.5,
        borderColor: "rgb(251, 171, 24)",
      }
    ]
    }
  }
  }

  createChartTwo(type, labels2, data2 ){
    console.log("FROM CHART2:Label:", labels2);
    console.log("FROM CHART2:Data:", data2);
    return {
    type: type,
    options: {
      responsive: true,
      title: {
        display: true,
        text: ''
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            fontColor: "#767676",
              fontFamily: "'Times New Roman',  Helvetica, sans-serif",
              fontSize: 13
        },
        gridLines: {
          display: true
        }
        }],
        xAxes: [{
          ticks: {
            display:true,
            fontFamily: "'Times New Roman',  Helvetica, sans-serif",
              fontColor: "#767676",
              fontSize: 13
        },barPercentage: 0.8,
        maxBarThickness: 100,
       
        gridLines: {
          display: true
        }
        }]
      },
      
      legend: {
        display: false,
        fontFamily: "'Times New Roman',  Helvetica, sans-serif",
        position:"top"
      },
    },
    data: {
      labels: labels2,
    
      datasets: [{
        label: 'Steps',
        data: data2,
        backgroundColor:"rgb(251, 171, 24, 0.4)",
        borderWidth: 0.5,
        borderColor: "rgb(251, 171, 24)",
      }
    ]
    }
  }
  }


  updateParamData(chart, labels, data, dataSetIndex){
    chart.data.datasets[dataSetIndex].data = data;
    chart.data.labels = labels;
    chart.update();
  }

  updateWeekCharts(chart, labels, datasets){
    chart.data.datasets=datasets;
    chart.data.labels = labels;
    chart.update();
  }

  chooseDate(type: string, event: MatDatepickerInputEvent<Date>) {

    // this.service.getAllData("2021-03-02").subscribe(dailydataapi => {
    // });


    var labels  = new Array;
    var data  = new Array;
    var labelTwo  = new Array;
    var dataTwo  = new Array;
    var labelThree  = new Array;
    var dataThree  = new Array;
    var labelFour  = new Array;
    var dataFour  = new Array;
    this.service.getAllData(this.datePipe.transform(new Date(event.value), "yyyy-MM-dd")).subscribe(dailydataapi => {
      
      dailydataapi.forEach(element => {
        if(element.param == "co") {
          let dashboard2 = element.data;
          dashboard2.forEach(dataparam => {
            labelTwo.push(dataparam.city);
            dataTwo.push(dataparam.aqi);
          });
        } else if(element.param == "so2") {
          let dashboard = element.data;
          dashboard.forEach(element => {
            labels.push(element.city);
            data.push(element.aqi);
          });
        } else if(element.param == "pm10") {
          let dashboard3 = element.data;
          dashboard3.forEach(element => {
            labelThree.push(element.city);
            dataThree.push(element.aqi);
          });
        } else if(element.param == "pm25") {
          let dashboard4 = element.data;
          dashboard4.forEach(element => {
            labelFour.push(element.city);
            dataFour.push(element.aqi);
          });
        }
      });

      this.updateParamData(this.chartOne, labels, data, 0 );
      this.updateParamData(this.chartTwo, labelTwo, dataTwo, 0 );
      this.updateParamData(this.chartThree, labelThree, dataThree, 0 );
      this.updateParamData(this.chartFour, labelFour, dataFour, 0 );
    });
    

    // console.log(this.datePipe.transform(new Date(event.value), "yyyy-MM-dd"));
    // var labels  = new Array;
    // var data  = new Array;
    // this.dashboard.forEach(element => {
    //   labels.push(element.city);
    //   var tempData = element.aqi * 10000;
    //   data.push(tempData);
    // });
    // this.updateParamData(this.chartOne, labels, data.map(x => x * 55), 0 );
    // this.updateParamData(this.chartTwo, labels, data.map(x => x * 65), 0 );
    // this.updateParamData(this.chartThree, labels, data.map(x => x * 75), 0 );
    // this.updateParamData(this.chartFour, labels, data.map(x => x * 85), 0 );
  }

  getTodaysDate(){
    const today = new Date()
    return today;
  }

}