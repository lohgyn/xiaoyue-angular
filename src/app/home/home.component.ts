import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Animations } from 'src/app/animation/animations';
import { Oauth2User } from 'src/app/model/oauth2-user';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [Animations.inOutAnimation],
})
export class HomeComponent implements OnInit {
  @Output() oauth2UserEvent: EventEmitter<Oauth2User> = new EventEmitter();

  loginUri: string = null;
  oauthUser: Oauth2User = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient,
    public authService: AuthService
  ) {}

  ngOnInit(): void{
    this.authService.getOauth2User().then((oauth2User) => {
      if (oauth2User !== null) {
        this.oauth2UserEvent.emit(oauth2User);
        this.oauthUser = oauth2User;
      } else {
        this.oauthUser = null;
      }
    });

    this.loginUri =
      environment.apiUri + '/login/oauth2/authorization/line?ngsw-bypass';
  }
}
