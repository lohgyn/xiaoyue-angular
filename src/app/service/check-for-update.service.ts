import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { concat, interval } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable()
export class CheckForUpdateService {
  constructor(appRef: ApplicationRef, private updates: SwUpdate) {
    // Allow the app to stabilize first, before starting polling for updates with `interval()`.
    if (updates.isEnabled) {
      const appIsStable$ = appRef.isStable.pipe(
        first((isStable) => isStable === true)
      );

      const everySixHours$ = interval(6 * 60 * 60 * 1000);
      const everySixHoursOnceAppIsStable$ = concat(
        appIsStable$,
        everySixHours$
      );

      everySixHoursOnceAppIsStable$.subscribe(() =>
        updates
          .checkForUpdate()
          .then(() => console.log('checking for updates'))
      );
    }
  }

  public checkForUpdates(): void {
    this.updates.available.subscribe((event) => this.promptUser());
  }

  private promptUser(): void {
    console.log('updating to new version');
    this.updates.activateUpdate().then(() => document.location.reload());
  }
}
