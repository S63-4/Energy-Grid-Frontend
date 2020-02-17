import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList, Renderer2 } from '@angular/core';
import { DashboardDataPoint } from '../models/dashboard-data-point.model';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../app.config';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',

  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  //Charts
  chartOptions = {
    responsive: false
  }
  chartData: ChartModel[] = [];
  labels: string[] = [];
  chart: Chart;
  //Filter
  selectedFilter: number = StatusPeriod.THREEMONTHS;


  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.updateCharts(StatusPeriod.THREEMONTHS);
  }

  onChartClick(event) {
    console.log(event);
  }
  changeFilter(period: number) {
    this.selectedFilter = period;
    this.updateCharts(period);
  }


  updateCharts(period) {
    this.chartData = [];
    this.labels = [];
    this.http.get(AppConfig.ApiBaseURL + `${AppConfig.ApiUrls.GETSTATUSFORPERIOD}?id=7&statusPeriod=${period}&currentDate=${new Date().getTime()}`).subscribe((data: Array<DashboardDataPoint>) => {
      let consumption: ChartModel = new ChartModel("Consumptie");
      consumption.backgroundColor = 'rgba(255,0,0, 0.8)';
      let production: ChartModel = new ChartModel("Productie");
      production.backgroundColor = 'rgba(0, 255, 0, 0.8)';
      data.forEach(datapoint => {
        consumption.data.push(datapoint.consumption);
        production.data.push(datapoint.production);
        this.labels.push(datapoint.label);
      });
      this.chartData.push(consumption, production);
      if (this.chart)
        this.chart.destroy();

      let dashboard = document.getElementById("chart") as HTMLCanvasElement;
      const context = dashboard.getContext('2d');
      context.clearRect(0, 0, dashboard.width, dashboard.height);
      this.chart = new Chart(dashboard, {
        type: "bar",
        data: {
          labels: this.labels,
          datasets: this.chartData,
        },
        options: {
          responsive: false,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      })
    });
  }
}
class ChartModel {
  label: string;
  data: number[] = [];
  backgroundColor: string;
  constructor(label: string) {
    this.label = label;
  }
}
enum StatusPeriod {
  YEAR,
  THREEMONTHS,
  MONTH,
  WEEK
}
