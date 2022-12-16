import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Twitter } from '@shared/models/social/twitter.model';
import { ToastService } from '@shared/services/helpers/toast.service';
import { TwitterService } from '@shared/services/social/twitter.service';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-twitter-detail',
  templateUrl: './twitter-detail.component.html',
  styleUrls: ['./twitter-detail.component.scss']
})
export class TwitterDetailComponent implements OnInit {

  @Input() twitter: Twitter = new Twitter();
  passwordVisible: boolean = false;

  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private modalRef: NzModalRef,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      name: [
        {
          value: this.twitter.name,
          disabled: true
        }
      ],
      consumerKey: [
        {
          value: this.twitter.consumerKey,
          disabled: true
        }
      ],
      consumerSecret: [
        {
          value: this.twitter.consumerSecret,
          disabled: true
        }
      ],
      oauthToken: [
        {
          value: this.twitter.oauthToken,
          disabled: true
        }
      ],
      oauthTokenSecret: [
        {
          value: this.twitter?.oauthTokenSecret,
          disabled: true
        }
      ],
      createdAt: [
        {
          value: this.formatDateToString(this.twitter?.createdAt),
          disabled: true
        }
      ],
      modifiedAt: [
        {
          value: this.formatDateToString(this.twitter?.modifiedAt),
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
