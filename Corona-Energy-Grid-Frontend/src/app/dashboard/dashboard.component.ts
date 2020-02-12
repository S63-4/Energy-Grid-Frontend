import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList, Renderer2 } from '@angular/core';
import { DashboardDataPoint } from '../models/dashboard-data-point.model';
import { Chart } from 'chart.js';

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

  //Filter
  selectedFilter: number = 2;


  constructor(private renderer: Renderer2) { }
  ngOnInit(): void {
    let obj = { Consumption: 320.4, Production: 224.4, Label: "Januari" }
    let obj2 = { Consumption: 420.4, Production: 94.4, Label: "Februari" }
    let data = [new DashboardDataPoint(obj), new DashboardDataPoint(obj2)];
    let consumption: ChartModel = new ChartModel("Consumptie");
    consumption.backgroundColor = 'rgba(255,0,0, 0.8)';
    let production: ChartModel = new ChartModel("Productie");
    production.backgroundColor = 'rgba(0, 255, 0, 0.8)';
    data.forEach(datapoint => {
      consumption.data.push(datapoint.Consumption);
      production.data.push(datapoint.Production);
      this.labels.push(datapoint.Label);
    });
    this.chartData.push(consumption, production);
    let dashboard = document.getElementById("chart") as HTMLCanvasElement;
    new Chart(dashboard, {
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
  }

  onChartClick(event) {
    console.log(event);
  }
  changeFilter(period: number) {
    this.selectedFilter = period;
    this.updateCharts(period);
  }


  updateCharts(period) {

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
  YEAR = 1,
  THREEMONTHS = 2,
  MONTH = 3,
  WEEK = 4
}
