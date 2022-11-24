import { InfoDetailComponent } from './info-detail/info-detail.component';
import { InfoUpdateComponent } from './info-update/info-update.component';
import { ROUTER_UTILS } from '@shared/utils/router.utils';
import { InfoComponent } from './info/info.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: ROUTER_UTILS.userInfo.list,
    component: InfoComponent,
    data: {
      title: "Danh sách thông tin khách hàng"
    }
  },

  {
    path: ROUTER_UTILS.userInfo.create,
    component: InfoUpdateComponent,
    data: {
      title: "Tạo mới thông tin khách hàng"
    }
  },

  {
    path: ROUTER_UTILS.userInfo.update,
    component: InfoUpdateComponent,
    data: {
      title: "Cập nhật thông tin khách hàng"
    }
  },

  {
    path: ROUTER_UTILS.userInfo.detail,
    component: InfoDetailComponent,
    data: {
      title: "Chi tiết thông tin khách hàng"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserInfoRoutingModule { }
