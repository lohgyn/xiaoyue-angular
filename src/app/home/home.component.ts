import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { DataItem, SingleSeries } from '@swimlane/ngx-charts';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment';
import { AlertService } from '../service/alert.service';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'u-main-container';

  private destroySubscriber = new Subject<void>();

  friends = 0;
  environment: any;

  // pie-chart chart
  pieChartReady = false;
  pieChartView: [number, number];
  pieChartTitle: string;
  pieChartData: SingleSeries;

  constructor(
    public authService: AuthService,
    private alertService: AlertService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.environment = environment;
    this.initPieChart();
  }

  ngOnDestroy(): void {
    this.destroySubscriber.next();
    this.destroySubscriber.complete();
  }

  initPieChart(): void {
    const friendsChartData: DataItem = {
      name: 'Friends Added',
      value: 5,
    };

    const targetChartData: DataItem = {
      name: 'Target reach',
      value: 4,
    };

    const blocksChartData: DataItem = {
      name: 'Blocking',
      value: 3,
    };

    this.apiService
      .getNumberOfFollower()
      .pipe(takeUntil(this.destroySubscriber))
      .subscribe(
        (res) => {
          const numberOfFollowers = res;

          if (numberOfFollowers.status === 'ready') {
            this.friends = numberOfFollowers.targetedReaches;

            friendsChartData.value = numberOfFollowers.targetedReaches;
            targetChartData.value = numberOfFollowers.followers;
            blocksChartData.value = numberOfFollowers.blocks;
          }
        },
        (err) => {
          if (!environment.production) {
            console.error(err);
          }

          this.alertService.addAlert(
            'Unable to get number of followers to generate chart.',
            'danger'
          );
        }
      )
      .add(() => {
        this.pieChartReady = true;
        this.pieChartTitle = `${environment.appTitle}'s friends`;
        this.pieChartData = [
          friendsChartData,
          targetChartData,
          blocksChartData,
        ];
      });
  }
}
