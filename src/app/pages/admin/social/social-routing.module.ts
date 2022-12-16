import { RedditGroupDetailComponent } from './reddit-group-detail/reddit-group-detail.component';
import { RedditGroupComponent } from './reddit-group/reddit-group.component';
import { RedditGroupUpdateComponent } from './reddit-group-update/reddit-group-update.component';
import { RedditUpdateComponent } from './reddit-update/reddit-update.component';
import { RedditComponent } from './reddit/reddit.component';
import { ROUTER_UTILS } from './../../../shared/utils/router.utils';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LineComponent } from './line/line.component';
import { TwitterComponent } from './twitter/twitter.component';

const routes: Routes = [

  {
    path: ROUTER_UTILS.social.twitter,
    component: TwitterComponent,
    data: {
      title: 'twitter.management'
    }
  },

  {
    path: ROUTER_UTILS.social.line,
    component: LineComponent,
    data: {
      title: 'line.management'
    }
  },

  {
    path: ROUTER_UTILS.social.reddit,
    component: RedditComponent,
    data: {
      title: 'reddit.management'
    }
  },

  {
    path: ROUTER_UTILS.social.redditCreate,
    component: RedditUpdateComponent,
    data: {
      title: "Reddit cá nhân"
    }
  },

  {
    path: ROUTER_UTILS.social.redditUpdate,
    component: RedditUpdateComponent,
    data: {
      title: "Reddit cá nhân"
    }
  },

  {
    path: ROUTER_UTILS.social.redditGroup,
    component: RedditGroupComponent,
    data: {
      title: 'reddit.group.management'
    }
  },

  {
    path: ROUTER_UTILS.social.redditGroupCreate,
    component: RedditGroupUpdateComponent,
    data: {
      title: "Nhóm reddit"
    }
  },

  {
    path: ROUTER_UTILS.social.redditGroupUpdate,
    component: RedditGroupUpdateComponent,
    data: {
      title: "Nhóm reddit"
    }
  },

  {
    path: ROUTER_UTILS.social.redditGroupDetail,
    component: RedditGroupDetailComponent,
    data: {
      title: "Nhóm reddit"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocialRoutingModule { }
