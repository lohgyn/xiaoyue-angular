import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
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

  private _oauth2User: BehaviorSubject<Oauth2User> = new BehaviorSubject(null);

  public setOauth2User(oauth2User: Oauth2User): void {
    if (oauth2User !== null) {
      sessionStorage.setItem('oauth2-user', JSON.stringify(oauth2User));
    }

    this._oauth2User.next(oauth2User);
  }

  public getOauth2User(): Observable<Oauth2User> {
    return this._oauth2User.asObservable();
  }

  public tryAuthenticate(): void {
    const startCheckOAuth2User = localStorage.getItem(
      'start-check-oauth2-user'
    );

    if (!environment.production) {
      console.log(`start-check-oauth2-user: ${startCheckOAuth2User}`);
      console.log(`oauth2-user: ${this._oauth2User.getValue()}`);
    }

    if (startCheckOAuth2User !== null && startCheckOAuth2User !== 'null') {
      let refreshOauth2User = true;

      if (this._oauth2User.getValue() === null) {
        const oauth2UserJSON = sessionStorage.getItem('oauth2-user');

        if (oauth2UserJSON !== null && oauth2UserJSON !== 'null') {
          try {
            if (!environment.production) {
              console.log(`oauth2UserJSON: ${oauth2UserJSON}`);
            }

            const oauth2User = JSON.parse(oauth2UserJSON);
            this.setOauth2User(oauth2User);
            refreshOauth2User = false;
          } catch (error) {
            if (!environment.production) {
              console.log(`convert oauth2UserJSON error: ${error}`);
            }
          }
        }
      }

      if (refreshOauth2User) {
        this.httpClient
          .get<Oauth2User>(`${environment.apiUri}/user`)
          .subscribe((oauth2User) => this.setOauth2User(oauth2User));
      }
    }
  }

  public logout(force?: boolean): void {
    this.spinnerService.setLoading(true);
    this.httpClient
      .post(
        `${environment.apiUri}/login/oauth2/logout`,
        {},
        {
          responseType: 'text',
        }
      )
      .subscribe()
      .add(() => {
        {
          localStorage.removeItem('start-check-oauth2-user');
          sessionStorage.removeItem('oauth2-user');
          this.setOauth2User(null);

          this.router.navigate(['/']).finally(() => {
            this.spinnerService.setLoading(false);

            if (force !== undefined && !force) {
              this.alertService.addAlert(
                'You have been logged out successfully.',
                'success'
              );
            }
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
}
