import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailInfoRoutingModule } from './email-info-routing.module';
import { EmailComponent } from './email/email.component';
import { EmailUpdateComponent } from './email-update/email-update.component';
import { EmailDetailComponent } from './email-detail/email-detail.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    EmailComponent,
    EmailUpdateComponent,
    EmailDetailComponent
  ],
  imports: [
    CommonModule,
    EmailInfoRoutingModule,
    SharedModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmailInfoModule { }
