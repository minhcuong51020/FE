import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Reddit } from '@shared/models/social/reddit.models';
import { ToastService } from '@shared/services/helpers/toast.service';
import { RedditServiceService } from '@shared/services/social/reddit-service.service';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-reddit-detail',
  templateUrl: './reddit-detail.component.html',
  styleUrls: ['./reddit-detail.component.scss']
})
export class RedditDetailComponent implements OnInit {

  @Input() reddit: Reddit = new Reddit();
  passwordVisible: boolean = false;
  clientIdVisibled: boolean = false;
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
        {
          value: this.reddit.username,
          disabled: true
        }
      ],
      password: [
        {
          value: this.reddit.password,
          disabled: true
        }  
      ],
      clientId: [
        {
          value: this.reddit.clientId,
          disabled: true
        }
      ],
      clientSecret: [
        {
          value: this.reddit.clientSecret,
          disabled: true
        }
      ],
      nameDisplay: [
        {
          value: this.reddit?.nameDisplay,
          disabled: true
        }
      ],
      createdAt: [
        {
          value: this.formatDateToString(this.reddit.createdAt),
          disabled: true
        }
      ],
      modifiedAt: [
        {
          value: this.formatDateToString(this.reddit.modifiedAt),
          disabled: true
        }
      ]
    })
  }

  onCancel(): void {
    this.modalRef.close({
      success: false,
      value: null,
    });
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

}
