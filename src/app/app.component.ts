import { Component, EventEmitter, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import {Animations} from './animation/animations'
import { Oauth2User } from './model/oauth2-user';
import { AuthService } from './service/auth.service';
import { CheckForUpdateService } from './service/check-for-update.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    Animations.inOutAnimation
  ]
})
export class AppComponent implements OnInit {

  environment = environment;
  oauth2User: Oauth2User;
  title: string;

  public constructor(
    public authService: AuthService,
    private titleService: Title,
    private checkForUpdateService: CheckForUpdateService
  ) {}


  ngOnInit(): void {
    this.title = this.environment.appTitle;
    this.setTitle('LINE ' + this.environment.appTitle);
    this.loadLineSocialPluginScript();
    this.checkForUpdateService.checkForUpdates();
  }

  public setTitle(title: string): void {
    this.titleService.setTitle(title);
  }

  onActivate(componentReference) {
    let oauth2UserEvent: EventEmitter<Oauth2User> = componentReference.oauth2UserEvent;

    if(oauth2UserEvent !== null) {
      oauth2UserEvent.subscribe((oauth2User:Oauth2User)=> {
        if(oauth2User != null) {
          this.oauth2User = oauth2User;
          this.title = oauth2User.displayName;
        }
      })
    }
 }

 public loadLineSocialPluginScript() {
  if(document.getElementById('line-social-plugin-script') === null) {
    const node = document.createElement('script');
    node.id = 'line-social-plugin-script'
    node.src = "https://d.line-scdn.net/r/web/social-plugin/js/thirdparty/loader.min.js";
    node.type = 'text/javascript';
    node.async = true;
    document.getElementsByTagName('head')[0].appendChild(node);
  }
}
}
