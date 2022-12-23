import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_UTILS } from '@shared/utils/router.utils';
import { StatisticComponent } from './statistic/statistic.component';

const routes: Routes = [
  {
    path: ROUTER_UTILS.statistical.list,
    component: StatisticComponent,
    data: {
      title: 'statistical.management'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticalRoutingModule { }
