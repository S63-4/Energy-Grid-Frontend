import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DashboardDataPoint } from '../models/dashboard-data-point.model';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',

  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  chartOptions = {
    responsive: false
  }
  labels: string[] = ['Januari', 'Februari'];
  chartData: ChartModel[] = [];
  constructor() { }
  ngOnInit(): void {
    let obj = { Consumption: 300, Production: 200, DateTime: new Date() }
    let data = [new DashboardDataPoint(obj)];
    let consumption: ChartModel = new ChartModel("Consumptie");
    consumption.backgroundColor = 'rgba(255,0,0, 0.8)';
    let production: ChartModel = new ChartModel("Productie");
    production.backgroundColor = 'rgba(0, 255, 0, 0.8)';
    data.forEach(datapoint => {
      consumption.data.push(datapoint.Consumption);
      production.data.push(datapoint.Production);
    });
    this.chartData.push(consumption, production);
    let dashboard = document.getElementById("chart") as HTMLCanvasElement;
    var chart = new Chart(dashboard, {
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

}
class ChartModel {
  label: string;
  data: number[] = [];
  backgroundColor: string;
  constructor(label: string) {
    this.label = label;
  }
}