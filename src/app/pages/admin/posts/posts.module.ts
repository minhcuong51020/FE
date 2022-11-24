import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostComponent } from './post/post.component';
import { PostUpdateComponent } from './post-update/post-update.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { SharedModule } from '@shared/shared.module';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';


@NgModule({
  declarations: [
    PostComponent,
    PostUpdateComponent,
    PostDetailComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    SharedModule,
    EditorModule
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PostsModule { }
