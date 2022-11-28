import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_UTILS } from '@shared/utils/router.utils';
import { SendEmailComponent } from './send-email/send-email.component';
import { SendRedditComponent } from './send-reddit/send-reddit.component';
import { SendSmsComponent } from './send-sms/send-sms.component';

const routes: Routes = [
  {
    path: ROUTER_UTILS.send.sendReddit,
    component: SendRedditComponent,
    data: {
      title: "Đăng bài lên Reddit"
    }
  },

  {
    path: ROUTER_UTILS.send.sendEmail,
    component: SendEmailComponent,
    data: {
      title: "Gửi email"
    }
  },

  {
    path: ROUTER_UTILS.send.sendSms,
    component: SendSmsComponent,
    data: {
      title: "Gửi SMS"
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SendRoutingModule { }
