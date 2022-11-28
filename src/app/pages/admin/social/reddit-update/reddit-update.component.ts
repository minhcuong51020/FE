import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { STATUS } from '@shared/constants/status.constants';
import { Reddit } from '@shared/models/social/reddit.models';
import { ToastService } from '@shared/services/helpers/toast.service';
import { RedditServiceService } from '@shared/services/social/reddit-service.service';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-reddit-update',
  templateUrl: './reddit-update.component.html',
  styleUrls: ['./reddit-update.component.scss']
})
export class RedditUpdateComponent implements OnInit {

  @Input() isUpdate = false;
  @Input() reddit: Reddit = new Reddit();
  passwordVisible: boolean = false;

  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private modalRef: NzModalRef,
    private toast: ToastService,
    private redditService: RedditServiceService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      username: [
        this.isUpdate ? this.reddit.username : '',
      ],
      password: [
        this.isUpdate ? this.reddit.password : '',
      ],
      clientId: [
        this.isUpdate ? this.reddit.clientId : '',
      ],
      clientSecret: [
        this.isUpdate ? this.reddit.clientSecret : '',
      ],
      displayName: [
        this.isUpdate ? this.reddit?.nameDisplay : '',
      ]
    })
  }

  onSubmit(): void {
    if (this.isUpdate) {
      this.updateReddit();
    } else {
      this.createReddit();
    }
  }

  onCancel(): void {
    this.modalRef.close({
      success: false,
      value: null,
    });
  }

  private updateReddit(): void {
    // if (this.form.invalid) {
    //   CommonUtil.markFormGroupTouched(this.form);
    //   return;
    // }
    const reddit: Reddit = {
      ...this.form.value,
    };
    if (this.reddit?.id) {
      this.redditService.updateReddit(reddit, this.reddit.id, true).subscribe((res) => {
        if (res.status === STATUS.SUCCESS_200) {
          this.toast.success('reddit.updateSuccess');
          this.modalRef.close({
            success: true,
            value: reddit,
          });
        }
      });
    }
  }

  private createReddit(): void {
    // if (this.form.invalid) {
    //   CommonUtil.markFormGroupTouched(this.form);
    //   return;
    // }
    const reddit: Reddit = {
      ...this.form.value,
    };
    console.log(reddit);
    
    this.redditService.createReddit(reddit, true).subscribe((res) => {
      if (res.status === STATUS.SUCCESS_200) {
        this.toast.success('clientInfo.createSuccess');
        this.modalRef.close({
          success: true,
          value: reddit,
        });
      }
    },
    (erorr) => {
      this.toast.error('Bạn chỉ có thể sở hữu một tài khoản reddit trong hệ thống');
    });
  }

}
