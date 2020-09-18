import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Label, MultiDataSet } from 'ng2-charts';
import { Animations } from 'src/app/animation/animations';
import { Oauth2User } from 'src/app/model/oauth2-user';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment';
import { NumberOfFollower } from '../model/number-of-follower';
import { AlertService } from '../service/alert.service';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [Animations.inOutAnimation],
})
export class HomeComponent implements OnInit {

  followers = 0;
  environment: any;

  // doughnut chart
  doughnutChartTitle: string;
  doughnutChartLabels: Label[];
  doughnutChartData: MultiDataSet;
  doughtnutChartReady: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient,
    public authService: AuthService,
    private alertService: AlertService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.environment = environment;
    this.initDoughnutChart();
  }

  initDoughnutChart(): void {
    this.doughnutChartTitle = environment.appTitle + "'s friends"
    this.doughtnutChartReady = false;
    this.doughnutChartLabels = ['Friends added', 'Target reach', 'Blocking'];
    this.doughnutChartData = [[0, 0, 0]];
    this.apiService
      .getNumberOfFollower()
      .subscribe(
        (res) => {

          const numberOfFollowers = res;

          if (numberOfFollowers.status === 'ready') {
            this.followers = numberOfFollowers.followers;
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
