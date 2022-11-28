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


@NgModule({
  declarations: [
    RedditGroupComponent,
    RedditGroupUpdateComponent,
    RedditGroupDetailComponent,
    RedditComponent,
    RedditUpdateComponent,
    RedditDetailComponent
  ],
  imports: [
    CommonModule,
    SocialRoutingModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SocialModule { }
