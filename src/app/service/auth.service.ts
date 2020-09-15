import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Oauth2User } from '../model/oauth2-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

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

}
