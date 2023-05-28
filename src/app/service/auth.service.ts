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
  private _oauth2User: BehaviorSubject<Oauth2User> = new BehaviorSubject(null);

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private alertService: AlertService,
    private spinnerService: SpinnerService
  ) {
    this.initOauth2User();
  }

  private initOauth2User(): void {
    const oauth2UserJSON = sessionStorage.getItem('oauth2-user');

    if (oauth2UserJSON === null) {
      return;
    }

    this.setOauth2User(JSON.parse(oauth2UserJSON));
  }

  public setOauth2User(oauth2User: Oauth2User): void {
    if (oauth2User === null) {
      sessionStorage.removeItem('oauth2-user');
      localStorage.removeItem('start-check-oauth2-user');
      this._oauth2User.next(null);
      return;
    }

    sessionStorage.setItem('oauth2-user', JSON.stringify(oauth2User));
    this._oauth2User.next(oauth2User);
  }

  public getOauth2User(): Observable<Oauth2User> {
    return this._oauth2User.asObservable();
  }

  public tryAuthenticate(): void {
    if (!localStorage.getItem('start-check-oauth2-user')) {
      return;
    }

    if (this._oauth2User.getValue() !== null) {
      return;
    }

    this.refreshOauth2User();
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

  private refreshOauth2User(): void {
    this.httpClient
      .get<Oauth2User>(`${environment.apiUri}/user`)
      .subscribe((oauth2User) => this.setOauth2User(oauth2User));
  }
}
