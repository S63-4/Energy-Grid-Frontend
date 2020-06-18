import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ViewChildren,
  QueryList,
  Renderer2,
} from "@angular/core";
import { DashboardDataPoint } from "../models/dashboard-data-point.model";
import { Chart } from "chart.js";
import { HttpClient } from "@angular/common/http";
import { AppConfig } from "../app.config";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",

  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  // Charts
  chartOptions = {
    responsive: false,
  };
  chartData: ChartModel[] = [];
  labels: string[] = [];
  chart: Chart;
  diff: number = 0;
  //Filter
  selectedFilter: number = StatusPeriod.MONTH;

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.updateCharts();
  }

  onChartClick(event) {
    console.log(event);
  }
  changeFilter(period: number) {
    this.selectedFilter = period;
    this.updateCharts();
  }

  updateCharts() {
    this.chartData = [];
    this.labels = [];
    this.http
      .get(
        AppConfig.ApiBaseURL +
          `${
            AppConfig.ApiUrls.GETSTATUSFORPERIOD
          }?startDate=${this.getStartDate(this.diff)}&endDate=${this.getEndDate(
            this.diff
          )}`
      )
      .subscribe((data: Array<DashboardDataPoint>) => {
        var sortedData = this.sort(data);
        let consumption: ChartModel = new ChartModel("Consumptie");
        consumption.backgroundColor = "rgba(255,0,0, 0.8)";
        let production: ChartModel = new ChartModel("Productie");
        production.backgroundColor = "rgba(0, 255, 0, 0.8)";
        data.forEach((datapoint) => {
          consumption.data.push(datapoint.consumption);
          production.data.push(datapoint.production);
          this.labels.push(this.getDateString(datapoint.dateTime));
        });
        this.chartData.push(consumption, production);
        if (this.chart) this.chart.destroy();

        let dashboard = document.getElementById("chart") as HTMLCanvasElement;
        const context = dashboard.getContext("2d");
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
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          },
        });
      });
  }
  sort(data: Array<DashboardDataPoint>): Array<DashboardDataPoint> {
    var sortedData: Array<DashboardDataPoint> = [];
    for (let index = 1; index === 31; index++) {
      const dataPoint = new DashboardDataPoint();
      const elements = data.filter((d) => d.dateTime.getDate() === index);
      if (elements) {
        dataPoint.dateTime = elements[0].dateTime;
        elements.forEach((e) => {
          dataPoint.consumption += e.consumption;
          dataPoint.production += e.production;
        });
      }
      sortedData.push(dataPoint);
    }
    return sortedData;
  }
  getDateString(date: Date): string {
    return date.toLocaleDateString();
  }
  getStartDate(diff: number): string {
    switch (this.selectedFilter) {
      case StatusPeriod.MONTH:
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth() - diff, 1);
        return firstDay.toISOString();
    }
  }
  getEndDate(diff: number): string {
    switch (this.selectedFilter) {
      case StatusPeriod.MONTH:
        var date = new Date();
        var lastDay = new Date(
          date.getFullYear(),
          date.getMonth() + 1 - diff,
          0
        );
        return lastDay.toISOString();
    }
  }
  switch(diff: number) {
    this.diff += diff;
    this.updateCharts();
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
  WEEK,
  MONTH,
}
