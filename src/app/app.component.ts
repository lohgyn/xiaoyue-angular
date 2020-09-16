import { Component, EventEmitter, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { Animations } from './animation/animations';
import { NumberOfFollower } from './model/number-of-follower';
import { Oauth2User } from './model/oauth2-user';
import { ApiService } from './service/api.service';
import { AuthService } from './service/auth.service';
import { CheckForUpdateService } from './service/check-for-update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [Animations.inOutAnimation],
})
export class AppComponent implements OnInit {
  environment = environment;
  oauth2User: Oauth2User;
  numberOfFollower: NumberOfFollower;
  title: string;

  public constructor(
    public authService: AuthService,
    private titleService: Title,
    private checkForUpdateService: CheckForUpdateService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.title = this.environment.appTitle;
    this.setTitle('LINE ' + this.environment.appTitle);
    this.checkForUpdateService.checkForUpdates();
    this.apiService
      .getNumberOfFollower()
      .subscribe((res) => (this.numberOfFollower = res));
  }

  public setTitle(title: string): void {
    this.titleService.setTitle(title);
  }

  onActivate(componentReference): void {
    const oauth2UserEvent: EventEmitter<Oauth2User> =
      componentReference.oauth2UserEvent;

    if (oauth2UserEvent !== null) {
      oauth2UserEvent.subscribe((oauth2User: Oauth2User) => {
        if (oauth2User != null) {
          this.oauth2User = oauth2User;
          this.title = oauth2User.displayName;
        }
      });
    }
  }
}
