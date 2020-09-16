import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NumberOfFollower } from '../model/number-of-follower';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  getNumberOfFollower():Observable<NumberOfFollower> {
    return this.httpClient.get<NumberOfFollower>(environment.apiUri + "/public/line/bot/followers");
  }
}
