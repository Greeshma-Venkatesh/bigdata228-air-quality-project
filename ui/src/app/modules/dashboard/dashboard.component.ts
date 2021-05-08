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
  dailydata:DailyData[];
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

    var labels  = new Array;
    var data  = new Array;
    var labelTwo  = new Array;
    var dataTwo  = new Array;
    var labelThree  = new Array;
    var labelFour  = new Array;
    this.getWeeksRange();
    //This will get data from API(dashboard.service.ts) and stores it in dashboard variable, make use of this variable for the API data
    this.service.getData().subscribe(dataapi => {
      this.dashboard = dataapi;
      console.log('FETCHED DATA:', this.dashboard);
      this.dashboard.forEach(element => {
        labels.push(element.city);
        data.push(element.aqi);
      });


      this.chartOne = new Chart('chartOne', this.createChartOne("bar", labels, data, "#65ba68"));
      
      labelTwo.push("Bangalore");
      labelTwo.push("Delhi");
      labelTwo.push("Chennai");
      labelTwo.push("Mumbai");
      labelTwo.push("Calcutta");
      
      
      
      labelThree.push("B1");
      labelThree.push("D1");
      labelThree.push("C1");
      labelThree.push("M1");
      labelThree.push("C1");
      this.chartThree = new Chart('chartThree', this.createChartOne("bar", labelThree, data.map(x => x * 10), "#ef524f"));
      
      
      labelFour.push("B2");
      labelFour.push("D2");
      labelFour.push("C2");
      labelFour.push("M2");
      labelFour.push("C2");
      this.chartFour = new Chart('chartFour', this.createChartOne("bar", labelFour, data.map(x => x * 15), "#3366ff"));
    });

    this.service.getAllData().subscribe(dailydataapi => {
      this.dailydata = dailydataapi;
      console.log('FETCHED DAILY DATA:', this.dailydata);
      this.dailydata.forEach(element => {
        if(element.param == "co") {
          this.dashboard2 = element.data;
          this.dashboard2.forEach(dataparam => {
            labelTwo.push(dataparam.city);
            dataTwo.push(dataparam.aqi);
          });
        }
      });

      this.chartTwo = new Chart('chartTwo', this.createChartOne("bar", labelTwo, dataTwo, "#ffa624"));
    });
    console.log("Labels:", labels);
    console.log("Data:", data);
    console.log("Labels2:", labelTwo);
    console.log("Data2:", dataTwo);
    //Chart one
    //Get the data from API and add it to the below arrays
    //labels: bar names
    //data: bar values

    //chart two
    //Get the data from API and add it to the below arrays
    //labels: bar names
    //data: bar values

    let datasets = new Array();

    let labels12= ["param1", "param2", "param3", "parma4", "param5"];
    let dataset1: Dataset = new Dataset();
    dataset1.label = "Bangalore";
    dataset1.data = [10, 19, 3, 5, 2];
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
    dataset5.data = [40, 49, 43, 45, 42];
    dataset5.backgroundColor = "#1ab2ff";

    datasets.push(dataset1);
    datasets.push(dataset2);
    datasets.push(dataset3);
    datasets.push(dataset4);
    datasets.push(dataset5);

    this.chartWeek = new Chart('chartWeek', this.createWeekCharts("bar", labels12,datasets));

    var labels2  = new Array;
    var data2  = new Array;
    labels2.push("a");
    labels2.push("b");
    labels2.push("c");
    labels2.push("d");
    labels2.push("e");
    labels2.push("f");
    labels2.push("g");
    labels2.push("h");
    labels2.push("i");
    labels2.push("j");
    labels2.push("k");
    labels2.push("l");

    data2.push(10.7);
    data2.push(20);
    data2.push(20.3);
    data2.push(20);
    data2.push(20);
    data2.push(20.5);
    data2.push(20);
    data2.push(20);
    data2.push(20.8);
    data2.push(20);
    data2.push(20);
    data2.push(20.800);

    //this.chartWeek = new Chart('chartWeek', this.createChartTwo("bar", labels2,data2));
    
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
    console.log(event.value);
    var labels  = new Array;
    var data  = new Array;
    this.dashboard.forEach(element => {
      labels.push(element.city);
      var tempData = element.aqi * 10000;
      data.push(tempData);
    });
    this.updateParamData(this.chartOne, labels, data.map(x => x * 55), 0 );
    this.updateParamData(this.chartTwo, labels, data.map(x => x * 65), 0 );
    this.updateParamData(this.chartThree, labels, data.map(x => x * 75), 0 );
    this.updateParamData(this.chartFour, labels, data.map(x => x * 85), 0 );
  }

  getTodaysDate(){
    const today = new Date()
    return today;
  }

}