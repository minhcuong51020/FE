import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialRoutingModule } from './social-routing.module';
import { RedditGroupComponent } from './reddit-group/reddit-group.component';
import { RedditGroupUpdateComponent } from './reddit-group-update/reddit-group-update.component';
import { RedditGroupDetailComponent } from './reddit-group-detail/reddit-group-detail.component';
import { RedditComponent } from './reddit/reddit.component';
import { RedditUpdateComponent } from './reddit-update/reddit-update.component';
import { SharedModule } from '@shared/shared.module';
import { RedditDetailComponent } from './reddit-detail/reddit-detail.component';
import { LineComponent } from './line/line.component';
import { LineUpdateComponent } from './line-update/line-update.component';
import { LineDetailComponent } from './line-detail/line-detail.component';
import { TwitterComponent } from './twitter/twitter.component';
import { TwitterUpdateComponent } from './twitter-update/twitter-update.component';
import { TwitterDetailComponent } from './twitter-detail/twitter-detail.component';


@NgModule({
  declarations: [
    RedditGroupComponent,
    RedditGroupUpdateComponent,
    RedditGroupDetailComponent,
    RedditComponent,
    RedditUpdateComponent,
    RedditDetailComponent,
    LineComponent,
    LineUpdateComponent,
    LineDetailComponent,
    TwitterComponent,
    TwitterUpdateComponent,
    TwitterDetailComponent
  ],
  imports: [
    CommonModule,
    SocialRoutingModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SocialModule { }
