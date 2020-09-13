import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit{
  lineLoginHref: string;
  title:string = '小月';

  public constructor(
    private titleService: Title,
    private httpClient: HttpClient,
    private route: ActivatedRoute
    
  ) {}


  ngOnInit(): void {
    this.setTitle(this.title);
    this.initLineLoginHref();
    
  }

  ngAfterViewInit(): void {
    this.route.queryParams.subscribe((params)=>{
      if(params.code !== undefined) {
        /*console.log('test0');
        const verifyUri = 'https://api.line.me/v2/oauth/accessToken';
        const grantType = 'authorization_code';
        const code = params.code;
        const channelId = environment.lineLogin.channelId;
        const channelSecret = '02555cc8a06e228128efdc6b7a83ec35';
        const redirectUri = environment.lineLogin.redirectUri;

        const body = new HttpParams()
        .append('grant_type', grantType)
        .append('client_id', channelId)
        .append('client_secret', channelSecret)
        .append('code', code)
        .append('redirect_uri', redirectUri)

        const header = {
          headers: new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded')
        }

        this.httpClient.post(verifyUri, body.toString(), header).subscribe((obj)=>{
          console.log(obj);
        });*/
      }
    })
  }

  public setTitle(newTitle: string): void {
    this.titleService.setTitle(newTitle);
  }

  public initLineLoginHref(): void {
    this.lineLoginHref = environment.apiUri + 'line/auth';
  }
}
