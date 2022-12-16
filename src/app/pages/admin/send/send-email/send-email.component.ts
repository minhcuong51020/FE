import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientInfo } from '@shared/models/client-info/client-info.model';
import { Email } from '@shared/models/post/email.models';
import { IPostUserInfoRequest, TypePostUserInfo } from '@shared/models/post/post-user-info.models';
import { IPosts } from '@shared/models/post/posts.model';
import { ClientInfoService } from '@shared/services/client-info/client-info.service';
import { ToastService } from '@shared/services/helpers/toast.service';
import { EmailService } from '@shared/services/posts/email.service';
import { PostsService } from '@shared/services/posts/posts.service';
import { RedditServiceService } from '@shared/services/social/reddit-service.service';
import CommonUtil from '@shared/utils/common-utils';
import { ROUTER_UTILS } from '@shared/utils/router.utils';
import { TransferItem } from 'ng-zorro-antd/transfer';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss']
})
export class SendEmailComponent implements OnInit {

  panels = [
    {
      active: false,
      name: 'post.info.root',
      disabled: false
    },
  ]
  list: TransferItem[] = [];
  form: FormGroup = new FormGroup({});
  private clientInfos: ClientInfo[] = [];
  postId!: string;
  post!: IPosts;
  emails!: Email[];
  $asTransferItems = (data: unknown): TransferItem[] => data as TransferItem[];

  constructor(
    private fb: FormBuilder,
    private toast: ToastService,
    private clientInfoService: ClientInfoService,
    private postService: PostsService,
    private route: ActivatedRoute,
    private emailService: EmailService,
    private router: Router,
  ) {
    
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((response) => {
      this.postId = response.get('postId') || '';
    });
    this.clientInfoService.searchAuto({}, true).subscribe(
      (res: any) => {
        if(res?.status === 200) {
          const data = res.body?.data;
          this.clientInfos = data;
          this.initTransfer();
        }
      }
    )
    this.postService.detail(this.postId).subscribe(
      (res) => {
        if(res.status === 200 && res.body?.data) {
          this.post = res.body?.data;
        }
      },
      (error) => {
        this.router.navigate([`/404`]);
        this.toast.error(error.error.message);
      }
    )
    this.emailService.search({}, true).subscribe(
      (res) => {
        if(res?.body?.data) {
          this.emails = res?.body?.data
        } else {
          this.emails = [];
        }
      }
    )
    this.form = this.fb.group({
      emailId: [
        '',
        [Validators.required],
      ]
    })
  }

  private initTransfer(): void {
    this.clientInfos.forEach(
      (item) => {
        this.list.push({
          key: item?.id,
          title: item?.name || '',
          email: item?.email,
          address: item?.address,
          direction: 'left'
        })
      }
    )
  }
  
  search(ret: TransferItem) {

  }
  
  onCancel(): void {
    this.router.navigate([`${ROUTER_UTILS.posts.root}`]);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      CommonUtil.markFormGroupTouched(this.form);
      return;
    }
    const userInfoIds: string[] = [];
    this.list.forEach(
      (item) => {
        if(item.direction === 'right') {
          userInfoIds.push(item?.key);
        }
      }
    )
    const postUserInfoRequest: IPostUserInfoRequest = {
      postId: this.postId,
      userInfoIds: userInfoIds,
      type: TypePostUserInfo.EMAIL,
      emailId: this.form.get('emailId')?.value
    }
    this.postService.sendEmail(postUserInfoRequest, true).subscribe(
      (res) => {
        if(res.status === 200) {
          this.router.navigate([`${ROUTER_UTILS.posts.root}`]);
          this.toast.success("Gửi email thành công");
        } else {
          this.toast.error("Gửi email thất bại");
        }
      }
    )
  }

}
