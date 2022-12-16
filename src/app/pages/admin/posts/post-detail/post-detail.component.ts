import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PostEmail } from '@shared/models/post/post-email';
import { PostRedditResponse } from '@shared/models/post/post-reddit.model';
import { PostSms } from '@shared/models/post/post-sms';
import { Posts } from '@shared/models/post/posts.model';
import { PostSocial } from '@shared/models/post/type-social.model';
import { ToastService } from '@shared/services/helpers/toast.service';
import { PostsService } from '@shared/services/posts/posts.service';
import { ROUTER_UTILS } from '@shared/utils/router.utils';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  tabIndex: number = 0;
  post!: Posts;
  postId!: string;
  postReddits: PostRedditResponse[] = [];
  postSmss: PostSms[] = [];
  postEmails: PostEmail[] = [];
  postSocials: PostSocial[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private postService: PostsService,
    private toastService: ToastService,
    private translateService: TranslateService
  ) { 
    this.activatedRoute.paramMap.subscribe((res) => {
      this.postId = res.get('postId') || '';
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.postService.detail(this.postId, true).subscribe(
      (res: any) => {
        const data = res.body?.data;
        console.log(data);
        
        this.post = data;
        this.postEmails = this.post.postEmailResponses || [];
        this.postSmss = this.post.postSmsResponses || [];
        this.postReddits = this.post.postRedditResponses || [];
        this.postSocials = this.post.postSocialResponses || [];
      },
      (error: any) => {
        this.router.navigate([`/404`]);
        this.toastService.error("post.notFound");
      }
    )
  }

  onCancel() {
    this.router.navigate([`${ROUTER_UTILS.posts.root}/${ROUTER_UTILS.posts.list}`]);
  }

  onChangeTab(tabIndex: number): any {
    this.tabIndex = tabIndex;
  }

  formatDateToString(date: any): string {
    if (!date) {
      return '';
    }
    const dateCurrent = new Date(date);
    return (
      [
        dateCurrent.getDate() < 10 ? `0${dateCurrent.getDate()}` : dateCurrent.getDate(),
        dateCurrent.getMonth() + 1 < 10 ? `0${dateCurrent.getMonth() + 1}` : dateCurrent.getMonth() + 1,
        dateCurrent.getFullYear(),
      ].join('-')
    ).toString();
  }

  private getError(err: any): any {
    if (err?.error?.errors?.length > 0) {
      return err?.error?.errors[0]?.message || err?.message;
    }
    return (
      err?.error?.message ||
      err?.message ||
      this.translateService.instant('error.msg')
    );
  }

}
