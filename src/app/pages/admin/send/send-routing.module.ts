import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_UTILS } from '@shared/utils/router.utils';
import { SendEmailComponent } from './send-email/send-email.component';
import { SendLineComponent } from './send-line/send-line.component';
import { SendRedditComponent } from './send-reddit/send-reddit.component';
import { SendSmsComponent } from './send-sms/send-sms.component';
import { SendTwitterComponent } from './send-twitter/send-twitter.component';

const routes: Routes = [
  {
    path: ROUTER_UTILS.send.sendLine,
    component: SendLineComponent,
    data: {
      title: 'send.line.management'
    }
  },

  {
    path: ROUTER_UTILS.send.sendTwitter,
    component: SendTwitterComponent,
    data: {
      title: 'send.twitter.management'
    }
  },

  {
    path: ROUTER_UTILS.send.sendReddit,
    component: SendRedditComponent,
    data: {
      title: 'send.reddit.management'
    }
  },

  {
    path: ROUTER_UTILS.send.sendEmail,
    component: SendEmailComponent,
    data: {
      title: 'send.email.management'
    }
  },

  {
    path: ROUTER_UTILS.send.sendSms,
    component: SendSmsComponent,
    data: {
      title: 'send.sms.management'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SendRoutingModule { }
