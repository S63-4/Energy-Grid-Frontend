import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { DashboardDataPoint } from "../models/dashboard-data-point.model";
import { Chart } from "chart.js";
import { HttpClient } from "@angular/common/http";
import { AppConfig } from "../app.config";
import * as moment from "moment";

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
  hourChart: Chart;
  diff: number = 0;
  data: Array<DashboardDataPoint>;
  hours: boolean = true;
  //Filter
  selectedFilter: number = StatusPeriod.MONTH;

  constructor(private http: HttpClient, private cdRef: ChangeDetectorRef) {}
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
        console.log(data);
        this.data = data;
        var sortedData = this.sort(data);
        let consumption: ChartModel = new ChartModel("Consumptie");
        consumption.backgroundColor = "rgba(255,0,0, 0.8)";
        let production: ChartModel = new ChartModel("Productie");
        production.backgroundColor = "rgba(0, 255, 0, 0.8)";
        sortedData.forEach((datapoint) => {
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
        var self = this;
        this.chart.options.onClick = function (evt) {
          var activeElement: any = this.chart.getElementAtEvent(evt);
          var dateString = activeElement[0]._model.label;
          var dateStringArray = dateString.split("-");
          var date = new Date();
          date.setDate(Number.parseInt(dateStringArray[0]));
          date.setMonth(Number.parseInt(dateStringArray[1]) - 1);
          date.setFullYear(Number.parseInt(dateStringArray[2]));

          self.initHourChart(date);
        };
      });
  }

  sort(data: Array<DashboardDataPoint>): Array<DashboardDataPoint> {
    var sortedData: Array<DashboardDataPoint> = [];
    for (let index = 1; index < 32; index++) {
      const dataPoint = new DashboardDataPoint();
      const elements = data.filter(
        (d) => new Date(d.dateTime).getDate() === index
      );

      if (elements && elements.length > 0) {
        dataPoint.dateTime = elements[0].dateTime;
        elements.forEach((e) => {
          dataPoint.consumption += e.consumption;
          dataPoint.production += e.production;
        });
        sortedData.push(dataPoint);
      }
    }

    return sortedData;
  }
  sortHours(data: Array<DashboardDataPoint>): Array<DashboardDataPoint> {
    var sortedData: Array<DashboardDataPoint> = [];
    data.sort((a, b) => {
      if (new Date(a.dateTime).getHours() === new Date(b.dateTime).getHours()) {
        b.consumption += a.consumption;
        b.production += a.production;
      } else {
        sortedData.push(a);
      }
      return 0;
    });
    return sortedData;
  }
  initHourChart(date: Date): void {
    this.hours = false;
    this.cdRef.detectChanges();
    this.hours = true;
    this.cdRef.detectChanges();
    var data = this.data.filter(
      (d) =>
        new Date(d.dateTime).toLocaleDateString() ===
        new Date(date).toLocaleDateString()
    );
    data = this.sortHours(data).sort((a, b) => {
      return new Date(a.dateTime).getHours() - new Date(b.dateTime).getHours();
    });
    var chartData: ChartModel[] = [];
    let consumption: ChartModel = new ChartModel("Consumptie");
    consumption.backgroundColor = "rgba(255,0,0, 0.8)";
    let production: ChartModel = new ChartModel("Productie");
    production.backgroundColor = "rgba(0, 255, 0, 0.8)";
    data.forEach((d) => {
      consumption.data.push(d.consumption);
      production.data.push(d.production);
    });
    chartData.push(consumption, production);
    if (this.hourChart) this.hourChart.destroy();
    let dashboard = document.getElementById("hourchart") as HTMLCanvasElement;
    const context = dashboard.getContext("2d");
    context.clearRect(0, 0, dashboard.width, dashboard.height);
    this.chart = new Chart(dashboard, {
      type: "bar",
      data: {
        labels: data.map((d) => {
          {
            return `${new Date(d.dateTime).getHours()}:00`;
          }
        }),
        datasets: chartData,
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
  }

  getDateString(date: Date): string {
    return new Date(date).toLocaleDateString();
  }
  getStartDate(diff: number): string {
    switch (this.selectedFilter) {
      case StatusPeriod.MONTH:
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth() - diff, 1);
        var isoString = moment(firstDay).toISOString(true);
        return isoString.split("+")[0];
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
        var isoString = moment(lastDay).toISOString(true);
        return isoString.split("+")[0];
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
