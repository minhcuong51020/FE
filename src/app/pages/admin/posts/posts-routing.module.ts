import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostUpdateComponent } from './post-update/post-update.component';
import { PostComponent } from './post/post.component';
import { ROUTER_UTILS } from '@shared/utils/router.utils';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: ROUTER_UTILS.posts.list,
    component: PostComponent,
    data: {
      title: 'post.management',
    }
  },

  {
    path: ROUTER_UTILS.posts.postscreate,
    component: PostUpdateComponent,
    data: {
      title: "Tạo mới bài viết",
    }
  },

  {
    path: ROUTER_UTILS.posts.postsupdate,
    component: PostUpdateComponent,
    data: {
      title: "Cập nhật bài viết",
    }
  },

  {
    path: ROUTER_UTILS.posts.postsdetial,
    component: PostDetailComponent,
    data: {
      title: "Xem chi tiết bài viết",
    }
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
