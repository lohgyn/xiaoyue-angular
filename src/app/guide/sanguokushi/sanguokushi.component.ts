import { Component, OnInit } from '@angular/core';
import { Util } from 'src/app/shared/util';

@Component({
  selector: 'app-sanguokushi',
  templateUrl: './sanguokushi.component.html',
  styleUrls: ['./sanguokushi.component.scss'],
  host: { class: 'content-area no-padding' },
})
export class SanguokushiComponent implements OnInit {
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
