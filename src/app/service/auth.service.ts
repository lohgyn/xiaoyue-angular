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

  public async isAuthenticated(): Promise<boolean> {
    return await this.getOauth2User() !== null;
  }

  public setOauth2User(oauth2User: Oauth2User): void {
    sessionStorage.setItem("oauth2-user", JSON.stringify(oauth2User));
  }

  public async getOauth2User(): Promise<Oauth2User> {
    let oauth2User = sessionStorage.getItem('oauth2-user');

    if(oauth2User === null) {
      try {
        const oauth2UserJson = await this.httpClient.get<Oauth2User>(environment.apiUri + '/user').toPromise();
        this.setOauth2User(oauth2UserJson);
        return oauth2UserJson;
      } catch (err) {
        console.info(err);
        return null;
      }
    } else {
      return JSON.parse(oauth2User);
    }
  }

  public logout(): void {

    this.httpClient.post(environment.apiUri + '/login/oauth2/logout', {}, {
      responseType: "text"
    }).subscribe(res => {
      console.info(res);
    }, err => {
      console.error(err);
    }, () => {
      sessionStorage.removeItem('oauth2-user');
      this.router.navigate(['/']).finally(() => location.reload());
    })
  }
}
