import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import {Animations} from './animation/animations'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    Animations.inOutAnimation
  ]
})
export class AppComponent implements OnInit {

  title: string;

  public constructor(
    private titleService: Title,
  ) {}


  ngOnInit(): void {
    this.title = environment.appTitle;
    this.setTitle(this.title);
  }

  public setTitle(newTitle: string): void {
    this.titleService.setTitle(newTitle);
  }
}
