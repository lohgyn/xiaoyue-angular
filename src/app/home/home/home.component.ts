import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Oauth2User } from 'src/app/model/oauth2-user';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment';
import { Animations } from 'src/app/animation/animations'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    Animations.inOutAnimation
  ]
})

export class HomeComponent implements OnInit {

  isAuthenticated: boolean = false;
  loginUri: string = null;
  oauthUser: Oauth2User = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient,
    private authService: AuthService,

  ) {}

  async ngOnInit(): Promise<void> {

    this.authService.getOauth2User().then(oauth2User => {
      if(oauth2User !== null) {
        this.isAuthenticated = true;
        this.oauthUser = oauth2User
      } else {
        this.oauthUser = null;
        this.isAuthenticated = false;
      }
    });

    this.loginUri = environment.apiUri + '/login/oauth2/authorization/line?ngsw-bypass';

    /*const userId = this.route.snapshot.queryParamMap.get('user_id');
    const accessToken = this.route.snapshot.queryParamMap.get('access_token');
    const refreshToken = this.route.snapshot.queryParamMap.get('refresh_token');

    console.info(userId);
    console.info(accessToken);
    console.info(refreshToken);*/
  }
}
