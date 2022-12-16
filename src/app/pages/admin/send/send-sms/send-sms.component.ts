import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientInfo } from '@shared/models/client-info/client-info.model';
import { IPostUserInfoRequest, TypePostUserInfo } from '@shared/models/post/post-user-info.models';
import { IPosts } from '@shared/models/post/posts.model';
import { ClientInfoService } from '@shared/services/client-info/client-info.service';
import { ToastService } from '@shared/services/helpers/toast.service';
import { PostsService } from '@shared/services/posts/posts.service';
import { ROUTER_UTILS } from '@shared/utils/router.utils';
import { TransferItem } from 'ng-zorro-antd/transfer';

@Component({
  selector: 'app-send-sms',
  templateUrl: './send-sms.component.html',
  styleUrls: ['./send-sms.component.scss']
})
export class SendSmsComponent implements OnInit {

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
  $asTransferItems = (data: unknown): TransferItem[] => data as TransferItem[];

  constructor(
    private fb: FormBuilder,
    private toast: ToastService,
    private clientInfoService: ClientInfoService,
    private postService: PostsService,
    private route: ActivatedRoute,
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
        this.toast.error("post.notFound");
      }
    )
  }

  private initTransfer(): void {
    this.clientInfos.forEach(
      (item) => {
        this.list.push({
          key: item?.id,
          title: item?.name || '',
          phone: item?.phone,
          address: item?.address,
          direction: 'left'
        })
      }
    )
  }
  
  onCancel(): void {
    this.router.navigate([`${ROUTER_UTILS.posts.root}`]);
  }

  onSubmit(): void {
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
      type: TypePostUserInfo.SMS
    }
    this.postService.sendSms(postUserInfoRequest, true).subscribe(
      (res) => {
        if(res.status === 200) {
          this.router.navigate([`${ROUTER_UTILS.posts.root}`]);
          this.toast.success("Gửi sms thành công");
        } else {
          this.toast.error("Gửi sms thất bại");
        }
      }
    )
  }

  search(ret: TransferItem) {

  }
}
