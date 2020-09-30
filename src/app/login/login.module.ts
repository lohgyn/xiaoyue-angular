import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { ClarityModule } from '@clr/angular';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, ClarityModule, LoginRoutingModule],
})
export class LoginModule {}
