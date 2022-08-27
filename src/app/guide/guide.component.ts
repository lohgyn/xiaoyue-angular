import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss'],
})
export class GuideComponent {
  @HostBinding('class') class = 'u-main-container';

  constructor() {}

}
