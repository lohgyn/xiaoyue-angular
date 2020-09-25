import { Component, HostBinding, OnInit } from '@angular/core';
import { Util } from 'src/app/shared/util';

@Component({
  selector: 'app-sanguokushi',
  templateUrl: './sanguokushi.component.html',
  styleUrls: ['./sanguokushi.component.scss'],
})
export class SanguokushiComponent implements OnInit {
  @HostBinding('class') class = 'content-area no-padding';

  lineChickDataUri = Util.getLineChickDataUri();

  fragment = 'top';

  constructor() {}

  ngOnInit(): void {}

  isActiveFragment(fragment: string): boolean {
    return fragment === this.fragment;
  }

  setActiveFragment(fragment: string): void {
    this.fragment = fragment;
  }
}
