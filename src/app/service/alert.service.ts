import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Alert } from '../model/alert';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private _alerts: BehaviorSubject<Alert[]> = new BehaviorSubject([]);

  constructor() {}

  addAlert(
    alert: Alert | string,
    type?: 'info' | 'warning' | 'success' | 'danger',
    action?: {
      text: string;
      obj: any;
      click(obj: any): any;
    }
  ): void {
    const alerts = this._alerts.getValue();
    let newAlert: Alert;
    if (typeof alert === 'string') {
      if (type === undefined) {
        type = 'info';
      }

      newAlert = {
        id: '' + new Date().getTime() + alerts.length,
        type,
        text: alert,
        action,
      };
    } else {
      newAlert = alert;
    }
    alerts.push(newAlert);
    this._alerts.next(alerts);
  }

  removeAlert(alertToRemove: Alert): void {
    const alerts = this._alerts.getValue();
    this._alerts.next(alerts.filter((alert) => alert.id !== alertToRemove.id));
  }

  getAlerts(): Observable<Alert[]> {
    return this._alerts.asObservable();
  }
}
