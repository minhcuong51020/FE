import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserInfoRoutingModule } from './user-info-routing.module';
import { InfoComponent } from './info/info.component';
import { InfoUpdateComponent } from './info-update/info-update.component';
import { InfoDetailComponent } from './info-detail/info-detail.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    InfoComponent,
    InfoUpdateComponent,
    InfoDetailComponent
  ],
  imports: [
    CommonModule,
    UserInfoRoutingModule,
    SharedModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserInfoModule { }
