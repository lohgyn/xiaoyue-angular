import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ServerErrorInterceptor } from './server-error.interceptor';

describe('ServerErrorInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [ServerErrorInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: ServerErrorInterceptor = TestBed.inject(
      ServerErrorInterceptor
    );
    expect(interceptor).toBeTruthy();
  });
});
