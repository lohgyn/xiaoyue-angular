import { Component, HostBinding, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @HostBinding('class') class = 'u-main-container';

  environment: any;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.environment = environment;
  }
}
