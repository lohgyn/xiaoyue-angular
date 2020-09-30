import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuideRoutingModule } from './guide-routing.module';
import { GuideComponent } from './guide.component';
import { SanguokushiComponent } from './sanguokushi/sanguokushi.component';
import { ClarityModule } from '@clr/angular';

@NgModule({
  declarations: [GuideComponent, SanguokushiComponent],
  imports: [CommonModule, GuideRoutingModule, ClarityModule],
})
export class GuideModule {}
