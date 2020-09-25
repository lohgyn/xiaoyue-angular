import { LayoutModule } from '@angular/cdk/layout';
import {
  HttpClientModule,
  HttpClientXsrfModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ClarityModule } from '@clr/angular';
import { ChartsModule } from 'ng2-charts';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DoughnutChartComponent } from './chart/doughnut-chart/doughnut-chart.component';
import { HomeComponent } from './home/home.component';
import { ServerErrorInterceptor } from './interceptor/server-error.interceptor';
import { LoginComponent } from './login/login.component';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { GuideComponent } from './guide/guide.component';
import { SanguokushiComponent } from './guide/sanguokushi/sanguokushi.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    MainNavigationComponent,
    DoughnutChartComponent,
    GuideComponent,
    SanguokushiComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ChartsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    LayoutModule,
    HttpClientModule,
    HttpClientXsrfModule,
    ClarityModule,
  ],
  providers: [
    HttpClientModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
