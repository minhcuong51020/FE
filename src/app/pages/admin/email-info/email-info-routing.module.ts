import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_UTILS } from '@shared/utils/router.utils';
import { EmailDetailComponent } from './email-detail/email-detail.component';
import { EmailUpdateComponent } from './email-update/email-update.component';
import { EmailComponent } from './email/email.component';

const routes: Routes = [
  {
    path: ROUTER_UTILS.emailInfo.list,
    component: EmailComponent,
    data: {
      title: 'email.management',
    }
  },

  {
    path: ROUTER_UTILS.emailInfo.emailCreate,
    component: EmailUpdateComponent,
    data: {
      title: "Tạo mới email",
    }
  },

  {
    path: ROUTER_UTILS.emailInfo.emailUpdate,
    component: EmailUpdateComponent,
    data: {
      title: "Cập nhật email",
    }
  },

  {
    path: ROUTER_UTILS.emailInfo.emailDetail,
    component: EmailDetailComponent,
    data: {
      title: "Xem chi tiết email",
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailInfoRoutingModule { }
