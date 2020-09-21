import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageGuard } from './guard/login-page.guard';
import { GuideComponent } from './guide/guide.component';
import { SanguokushiComponent } from './guide/sanguokushi/sanguokushi.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'dashboard',
    component: HomeComponent,
  },
  {
    path: 'guide',
    component: GuideComponent,
    children: [
      {
        path: '',
        redirectTo: 'sanguogushi',
        pathMatch: 'full',
      },
      {
        path: 'sanguogushi',
        component: SanguokushiComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginPageGuard],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
