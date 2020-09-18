import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Oauth2User } from '../model/oauth2-user';
import { AlertService } from './alert.service';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private alertService: AlertService,
    private spinnerService: SpinnerService
  ) {}

  private oauth2User: Oauth2User = null;

  public setOauth2User(oauth2User: Oauth2User): void {
    if (oauth2User !== null) {
      sessionStorage.setItem('oauth2-user', JSON.stringify(oauth2User));
    }
    this.oauth2User = oauth2User;
  }

  public getOauth2User(): Oauth2User {
    return this.oauth2User;
  }

  public tryAuthenticate(): Observable<Oauth2User> {
    const startGetAuth2User = localStorage.getItem('start-check-oauth2-user');

    if (!environment.production) {
      console.log('start-check-oauth2-user: ' + startGetAuth2User);
      console.log('oauth2-user: ' + this.oauth2User);
    }

    if (startGetAuth2User !== null && startGetAuth2User !== 'null') {
      if (this.oauth2User === null) {
        const oauth2UserJSON = sessionStorage.getItem('oauth2-user');

        if (oauth2UserJSON !== null && oauth2UserJSON !== 'null') {
          if (!environment.production) {
            console.log('oauth2UserJSON: ' + oauth2UserJSON);
          }

          try {
            const oauth2User = JSON.parse(oauth2UserJSON);
            return new Observable<Oauth2User>((observer) => {
              observer.next(JSON.parse(oauth2User));
              observer.complete();
            });
          } catch (error) {
            if (!environment.production) {
              console.log('convert oauth2UserJSON error: ' + error);
            }

            return this.httpClient.get<Oauth2User>(
              environment.apiUri + '/user'
            );
          }
        } else {
          return this.httpClient.get<Oauth2User>(environment.apiUri + '/user');
        }
      } else {
        return new Observable<Oauth2User>((observer) => {
          observer.next(this.oauth2User);
          observer.complete();
        });
      }
    } else {
      return new Observable<Oauth2User>((observer) => {
        observer.next(this.oauth2User);
        observer.complete();
      });
    }
  }

  public logout(): void {
    this.spinnerService.setLoading(true);
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
        }
      )
      .add(() => {
        {
          localStorage.removeItem('start-check-oauth2-user');
          sessionStorage.removeItem('oauth2-user');
          this.setOauth2User(null);

          this.router.navigate(['/']).finally(() => {
            this.spinnerService.setLoading(false);
            this.alertService.addAlert(
              'You have been logged out successfully.',
              'success'
            );
          });
        }
      });
  }

  public startCheckOAuth2User(): void {
    if (!environment.production) {
      console.log('start to check oauth2 user now...');
    }
    localStorage.setItem('start-check-oauth2-user', 'true');
  }

  public stopCheckOAuth2User(): void {
    if (!environment.production) {
      console.log('stop to check oauth2 user now...');
    }

    localStorage.removeItem('start-check-oauth2-user');
  }
}
