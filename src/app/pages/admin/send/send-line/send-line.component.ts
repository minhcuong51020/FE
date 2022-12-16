import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IPostLine } from '@shared/models/post/post-line.model';
import { IPosts } from '@shared/models/post/posts.model';
import { Line } from '@shared/models/social/line.model';
import { ToastService } from '@shared/services/helpers/toast.service';
import { PostsService } from '@shared/services/posts/posts.service';
import { LineService } from '@shared/services/social/line.service';
import CommonUtil from '@shared/utils/common-utils';
import { ROUTER_UTILS } from '@shared/utils/router.utils';

@Component({
  selector: 'app-send-line',
  templateUrl: './send-line.component.html',
  styleUrls: ['./send-line.component.scss']
})
export class SendLineComponent implements OnInit {

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
  lines!: Line[];

  constructor(
    private fb: FormBuilder,
    private toast: ToastService,
    private postService: PostsService,
    private lineService: LineService,
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
    this.lineService.search({}).subscribe((res) => {
      if(res.status === 200 && res.body?.data) {
        this.lines = res.body?.data;
      }
    })
    this.form = this.fb.group({
      lineId: [
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

    const postLine: IPostLine = {
      postId: this.postId,
      lineId: this.form.get('lineId')?.value
    }
    this.postService.sendLine(postLine, true).subscribe(
      (res) => {
        if(res.status === 200) {
          this.router.navigate([`${ROUTER_UTILS.posts.root}`]);
          this.toast.success("Gửi quảng bá lên Line thành công");
        } else {
          this.toast.error("Gửi quảng bá lên Line thất bại");
        }
      }
    )
  }

}
