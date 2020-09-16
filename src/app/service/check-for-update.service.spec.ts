import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CheckForUpdateService } from './check-for-update.service';

describe('CheckForUpdateService', () => {
  let service: CheckForUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ServiceWorkerModule.register('', { enabled: false }),
      ],
    });
    service = TestBed.inject(CheckForUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
