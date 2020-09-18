import { ViewChild } from '@angular/core';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { BaseChartDirective, Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss'],
})
export class DoughnutChartComponent implements OnInit {

  @ViewChild(BaseChartDirective)
  doughtnutChart: BaseChartDirective;

  @Input()
  doughnutChartLabels: Label[];

  @Input()
  doughnutChartData: MultiDataSet;

  @Input()
  ready: boolean;

  constructor() {}

  ngOnInit(): void {
  }

  @HostListener("window:resize", [])
  onResize() {
    this.ready = false;
    setTimeout(()=> {
      this.ready = true;
    },1000)
  }
}
