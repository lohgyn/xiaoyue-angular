import { Component, OnDestroy, OnInit } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Animations } from 'src/app/animation/animations';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment';
import { AlertService } from '../service/alert.service';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [Animations.inOutAnimation],
})
export class HomeComponent implements OnInit, OnDestroy {
  private destroySubscriber = new Subject<void>();

  friends = 0;
  environment: any;

  // doughnut chart
  doughnutChartTitle: string;
  doughnutChartLabels: Label[];
  doughnutChartData: MultiDataSet;
  doughtnutChartReady: boolean;

  constructor(
    public authService: AuthService,
    private alertService: AlertService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.environment = environment;
    this.initDoughnutChart();
  }

  ngOnDestroy(): void {
    this.destroySubscriber.next();
    this.destroySubscriber.complete();
  }

  initDoughnutChart(): void {
    this.doughnutChartTitle = `${environment.appTitle}'s friends`;
    this.doughtnutChartReady = false;
    this.doughnutChartLabels = ['Friends added', 'Target reach', 'Blocking'];
    this.doughnutChartData = [[0, 0, 0]];
    this.apiService
      .getNumberOfFollower()
      .pipe(takeUntil(this.destroySubscriber))
      .subscribe(
        (res) => {
          const numberOfFollowers = res;

          if (numberOfFollowers.status === 'ready') {
            this.friends = numberOfFollowers.targetedReaches;
            this.doughnutChartData = [
              [
                numberOfFollowers.targetedReaches,
                numberOfFollowers.followers,
                numberOfFollowers.blocks,
              ],
            ];
          } else {
            this.doughnutChartData = [[0, 0, 0]];
          }
        },
        (err) => {
          this.doughnutChartData = [[0, 0, 0]];
          if (!environment.production) {
            console.error(err);
          }

          this.alertService.addAlert(
            'Unable to get number of followers to generate chart.',
            'danger'
          );
        }
      )
      .add(() => (this.doughtnutChartReady = true));
  }
}
