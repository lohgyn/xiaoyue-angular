import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate, UpdateAvailableEvent } from '@angular/service-worker';
import { concat, interval } from 'rxjs';
import { first } from 'rxjs/operators';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class CheckForUpdateService {
  constructor(
    appRef: ApplicationRef,
    private updates: SwUpdate,
    private alertService: AlertService
  ) {
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
        updates.checkForUpdate().then()
      );
    }
  }

  public checkForUpdates(): void {
    if (this.updates.isEnabled) {
      this.updates.available.subscribe((event: UpdateAvailableEvent) => {
        this.updates.activateUpdate().then(() => {
          this.alertService.addAlert(
            'A new update has been applied. Please reload the page to activate it.',
            'info',
            {
              text: 'Reload Now',
              obj: document,
              click: (document: Document) => {
                document.location.reload();
              },
            }
          );
        });
      });
    }
  }
}
