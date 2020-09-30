import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuideComponent } from './guide.component';
import { SanguokushiComponent } from './sanguokushi/sanguokushi.component';

const routes: Routes = [
  {
    path: '',
    component: GuideComponent,
    children: [
      {
        path: '',
        redirectTo: 'sanguogushi',
        pathMatch: 'full',
      },
      {
        path: 'sanguogushi',
        component: SanguokushiComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuideRoutingModule {}
