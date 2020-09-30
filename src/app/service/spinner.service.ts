import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private _loading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {}

  public isLoading(): Observable<boolean> {
    return this._loading.asObservable();
  }

  public setLoading(loading: boolean): void {
    this._loading.next(loading);
  }
}
