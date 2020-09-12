import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  lineLoginHref: string;
  title:string = '小月';

  public constructor(
    private titleService: Title,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.setTitle(this.title);
    this.initLineLoginHref();
  }

  public setTitle(newTitle: string): void {
    this.titleService.setTitle(newTitle);
  }

  public initLineLoginHref(): void {

    this.getUuid().subscribe((uuid) => {
      const params = new HttpParams()
        .append('response_type', 'code')
        .append('client_id', environment.lineLogin.channelId)
        .append('redirect_uri', environment.lineLogin.redirectUri)
        .append('state', uuid)
        .append('scope', environment.lineLogin.scope)
        .append('bot_prompt', environment.lineLogin.botPrompt);

        this.lineLoginHref = environment.lineLogin.authUri + "?" + params.toString();
    });


  }

  private getUuid(): Observable<string> {
    return this.httpClient.get(environment.apiUri + 'uuid', { responseType: 'text' });
  }
}
