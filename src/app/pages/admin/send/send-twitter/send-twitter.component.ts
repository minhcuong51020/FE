import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IPostTwitter } from '@shared/models/post/post-twitter.model';
import { IPosts } from '@shared/models/post/posts.model';
import { ITwitter, Twitter } from '@shared/models/social/twitter.model';
import { ToastService } from '@shared/services/helpers/toast.service';
import { PostsService } from '@shared/services/posts/posts.service';
import { TwitterService } from '@shared/services/social/twitter.service';
import CommonUtil from '@shared/utils/common-utils';
import { ROUTER_UTILS } from '@shared/utils/router.utils';

@Component({
  selector: 'app-send-twitter',
  templateUrl: './send-twitter.component.html',
  styleUrls: ['./send-twitter.component.scss']
})
export class SendTwitterComponent implements OnInit {

  panels = [
    {
      active: true,
      name: 'post.info.root',
      disabled: false
    },
  ]
  form: FormGroup = new FormGroup({});
  postId!: string;
  post!: IPosts;
  twitters!: Twitter[];

  constructor(
    private fb: FormBuilder,
    private toast: ToastService,
    private postService: PostsService,
    private twitterService: TwitterService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((response) => {
      this.postId = response.get('postId') || '';
    });
    this.postService.detail(this.postId).subscribe(
      (res) => {
        if(res.status === 200 && res.body?.data) {
          this.post = res.body?.data;
        }
      },
      (error) => {
        this.router.navigate([`/404`]);
        this.toast.error("post.notFound");
      }
    )
    this.twitterService.search({}).subscribe((res) => {
      if(res.status === 200 && res.body?.data) {
        this.twitters = res.body?.data;
      }
    })
    this.form = this.fb.group({
      twitterId: [
        '',
        [Validators.required],
      ]
    })
  }
  
  onCancel(): void {
    this.router.navigate([`${ROUTER_UTILS.posts.root}`]);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      CommonUtil.markFormGroupTouched(this.form);
      return;
    }

    const postTwitter: IPostTwitter = {
      postId: this.postId,
      twitterId: this.form.get('twitterId')?.value
    }
    this.postService.sendTwitter(postTwitter, true).subscribe(
      (res) => {
        if(res.status === 200) {
          this.router.navigate([`${ROUTER_UTILS.posts.root}`]);
          this.toast.success("Đăng bài lên Twitter thành công");
        } else {
          this.toast.error("Đăng bài lên Twitter thất bại");
        }
      }
    )
  }

}
