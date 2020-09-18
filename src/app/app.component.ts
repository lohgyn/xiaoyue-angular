import { Component, EventEmitter, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { Animations } from './animation/animations';
import { Alert } from './model/alert';
import { NumberOfFollower } from './model/number-of-follower';
import { Oauth2User } from './model/oauth2-user';
import { AlertService } from './service/alert.service';
import { AuthService } from './service/auth.service';
import { CheckForUpdateService } from './service/check-for-update.service';
import { SpinnerService } from './service/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [Animations.inOutAnimation],
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
    this.setTitle('LINE ' + this.environment.appTitle);
    this.tryAuthenticate();
    this.checkForUpdateService.checkForUpdates();
  }

  private setTitle(title: string): void {
    this.titleService.setTitle(title);

  }

  private tryAuthenticate() {
    this.authService.tryAuthenticate().subscribe(
      (res) => {
        if (res !== null) {
          this.authService.setOauth2User(res);
        }
      },
      (err) => {
        if (!environment.production) {
          console.error(err);
        }
        this.authService.stopCheckOAuth2User();
        this.alertService.addAlert(
          'Your session has been expired. Please log in again.',
          'danger'
        );
      }
    );
  }

  onActivate(componentReference): void {
    const oauth2UserEvent: EventEmitter<Oauth2User> =
      componentReference.oauth2UserEvent;

    if (oauth2UserEvent !== undefined) {
      /*oauth2UserEvent.subscribe((oauth2User: Oauth2User) => {
        if (oauth2User != null) {
          this.oauth2User = oauth2User;
          this.title = oauth2User.displayName;
        }
      });*/
    }
  }

  trackAlertBy(alert: Alert): string {
    return alert.id;
  }

  onAlertClose(alert: Alert): void {
    this.alertService.removeAlert(alert);
  }
}
