import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: {class: "u-main-container"}
})
export class LoginComponent implements OnInit {

  environment;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.environment = environment;
  }
}

