import { Component, OnInit } from '@angular/core';
import { Util } from 'src/app/shared/util';

@Component({
  selector: 'app-sanguokushi',
  templateUrl: './sanguokushi.component.html',
  styleUrls: ['./sanguokushi.component.scss'],
  host: { class: 'content-area no-padding', style: 'overflow-x:hidden' },
})
export class SanguokushiComponent implements OnInit {
  lineChickDataUri = Util.getLineChickDataUri();

  constructor() {}

  ngOnInit(): void {}
}
