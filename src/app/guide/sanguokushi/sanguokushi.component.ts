import { Component, HostBinding } from '@angular/core';
import { Util } from 'src/app/shared/util';

@Component({
  selector: 'app-sanguokushi',
  templateUrl: './sanguokushi.component.html',
  styleUrls: ['./sanguokushi.component.scss'],
})
export class SanguokushiComponent {
  @HostBinding('class') class = 'content-area no-padding';

  lineChickDataUri = Util.getLineChickDataUri();

  fragment = 'top';

  isActiveFragment(fragment: string): boolean {
    return fragment === this.fragment;
  }

  setActiveFragment(fragment: string): void {
    this.fragment = fragment;
  }
}
