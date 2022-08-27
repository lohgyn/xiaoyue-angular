import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { SingleSeries } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnChanges {
  @Input()
  view: [number, number];

  actualView: [number, number];

  @Input()
  title: string;

  @Input()
  labels = true;

  @Input()
  legend = true;

  @Input()
  legendTitle = 'Legend';

  @Input()
  legendPosition = 'below';

  @Input()
  trimLabels = true;

  @Input()
  explodeSlices = false;

  @Input()
  data: SingleSeries;

  @Input()
  ready: boolean;

  constructor(private elementRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'data':
            this.checkData(changes[propName].currentValue);
            break;

          case 'view':
            this.actualView = changes[propName].currentValue;
            break;
        }
      }
    }
  }

  checkData(data: SingleSeries): void {
    if (
      data !== undefined &&
      data.find((item) => item.value > 0) === undefined &&
      this.view === undefined
    ) {
      this.actualView = [this.elementRef.nativeElement.offsetWidth, 1];
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    this.ready = false;
    this.checkData(this.data);
    setTimeout(() => (this.ready = true), 1);
  }
}
