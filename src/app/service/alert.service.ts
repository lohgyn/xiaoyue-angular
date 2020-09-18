import { Injectable } from '@angular/core';
import { Alert } from '../model/alert';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alerts: Alert[] = [];

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
    if (typeof alert === 'string') {
      if (type === undefined) {
        type = 'info';
      } else {
      }
      this.alerts.push({
        id: '' + new Date().getTime() + this.alerts.length,
        type,
        text: alert,
        action,
      });
    } else {
      this.alerts.push(alert);
    }
  }

  removeAlert(alertToRemove: Alert): void {
    this.alerts = this.alerts.filter((alert) => alert.id !== alertToRemove.id);
  }

  getAlerts(): Alert[] {
    return this.alerts;
  }
}
