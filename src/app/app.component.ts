import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { Alert } from './model/alert';
import { NumberOfFollower } from './model/number-of-follower';
import { AlertService } from './service/alert.service';
import { AuthService } from './service/auth.service';
import { CheckForUpdateService } from './service/check-for-update.service';
import { SpinnerService } from './service/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  environment = environment;
  numberOfFollower: NumberOfFollower;

  public constructor(
    public authService: AuthService,
    private titleService: Title,
    private checkForUpdateService: CheckForUpdateService,
    public alertService: AlertService,
    public spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    this.setTitle(`LINE ${this.environment.appTitle}`);
    this.authService.tryAuthenticate();
    this.checkForUpdateService.checkForUpdates();
  }

  private setTitle(title: string): void {
    this.titleService.setTitle(title);
  }

  onAlertClose(alert: Alert): void {
    this.alertService.removeAlert(alert);
  }
}
