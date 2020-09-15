import { Component, EventEmitter, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import {Animations} from './animation/animations'
import { Oauth2User } from './model/oauth2-user';
import { AuthService } from './service/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    Animations.inOutAnimation
  ]
})
export class AppComponent implements OnInit {

  oauth2User: Oauth2User;
  title: string;

  public constructor(
    public authService: AuthService,
    private titleService: Title,
  ) {}


  ngOnInit(): void {
    this.title = environment.appTitle;
    this.setTitle(this.title);
  }

  public setTitle(title: string): void {
    this.title = title;
    this.titleService.setTitle(title);
  }

  onActivate(componentReference) {
    let oauth2UserEvent: EventEmitter<Oauth2User> = componentReference.oauth2UserEvent;

    if(oauth2UserEvent !== null) {
      oauth2UserEvent.subscribe((oauth2User:Oauth2User)=> {
        if(oauth2User != null) {
          this.oauth2User = oauth2User;
          this.setTitle(oauth2User.displayName);
        }
      })
    }
 }
}
