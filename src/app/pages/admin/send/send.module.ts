import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendRoutingModule } from './send-routing.module';
import { SharedModule } from '@shared/shared.module';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { SendRedditComponent } from './send-reddit/send-reddit.component';
import { NzTransferModule } from 'ng-zorro-antd/transfer';
import { SendEmailComponent } from './send-email/send-email.component';
import { SendSmsComponent } from './send-sms/send-sms.component';
import { SendLineComponent } from './send-line/send-line.component';
import { SendTwitterComponent } from './send-twitter/send-twitter.component';


@NgModule({
  declarations: [
    SendRedditComponent,
    SendEmailComponent,
    SendSmsComponent,
    SendLineComponent,
    SendTwitterComponent
  ],
  imports: [
    CommonModule,
    SendRoutingModule,
    SharedModule,
    NzCollapseModule,
    NzTransferModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SendModule { }
