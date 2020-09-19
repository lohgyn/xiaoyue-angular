import { TestBed } from '@angular/core/testing';
import { LoginPageGuard } from './login-page.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('AuthGuardGuard', () => {
  let guard: LoginPageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
    });
    guard = TestBed.inject(LoginPageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
