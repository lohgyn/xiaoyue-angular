import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Oauth2User } from '../model/oauth2-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  public setOauth2User(oauth2User: Oauth2User): void {
    sessionStorage.setItem('oauth2-user', JSON.stringify(oauth2User));
  }

  public async getOauth2User(): Promise<Oauth2User> {
    const startGetAuth2User = localStorage.getItem('start-check-oauth2-user');

    if (startGetAuth2User === null) {
      return null;
    }

    const oauth2User = sessionStorage.getItem('oauth2-user');

    if (oauth2User !== null) {
      return JSON.parse(oauth2User);
    } else {
      return await this.renewOauth2User();
    }
  }

  private async renewOauth2User(): Promise<Oauth2User> {
    try {
      const oauth2UserJson = await this.httpClient
        .get<Oauth2User>(environment.apiUri + '/user')
        .toPromise();

      this.setOauth2User(oauth2UserJson);

      return oauth2UserJson;
    } catch (err) {
      // 401 Unauthorized
      this.logout();
      return null;
    }
  }

  public logout(): void {
    this.httpClient
      .post(
        environment.apiUri + '/login/oauth2/logout',
        {},
        {
          responseType: 'text',
        }
      )
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.error(err);
        },
        () => {
          localStorage.removeItem('start-check-oauth2-user');
          sessionStorage.removeItem('oauth2-user');
          this.router.navigate(['/']).finally(() => location.reload());
        }
      );
  }

  public startCheckOAuth2User(): void {
    localStorage.setItem('start-check-oauth2-user', 'true');
  }
}
