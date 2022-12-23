import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticalRoutingModule } from './statistical-routing.module';
import { SharedModule } from '@shared/shared.module';
import { SocialRoutingModule } from '../social/social-routing.module';
import { StatisticComponent } from './statistic/statistic.component';


@NgModule({
  declarations: [
    StatisticComponent
  ],
  imports: [
    CommonModule,
    StatisticalRoutingModule,
    SharedModule,
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StatisticalModule { }
