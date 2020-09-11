import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'LINE 小月';

  public constructor(private titleService: Title ) { }
  ngOnInit(): void {
    this.setTitle(this.title);
  }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }


}
