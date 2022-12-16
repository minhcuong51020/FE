import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STATUS } from '@shared/constants/status.constants';
import { Twitter } from '@shared/models/social/twitter.model';
import { ToastService } from '@shared/services/helpers/toast.service';
import { TwitterService } from '@shared/services/social/twitter.service';
import CommonUtil from '@shared/utils/common-utils';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-twitter-update',
  templateUrl: './twitter-update.component.html',
  styleUrls: ['./twitter-update.component.scss']
})
export class TwitterUpdateComponent implements OnInit {

  @Input() isUpdate = false;
  @Input() twitter: Twitter = new Twitter();
  passwordVisible: boolean = false;

  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private modalRef: NzModalRef,
    private toast: ToastService,
    private twitterService: TwitterService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      name: [
        this.isUpdate ? this.twitter.name : '',
        [
          Validators.required,
        ],
      ],
      consumerKey: [
        this.isUpdate ? this.twitter.consumerKey : '',
        [
          Validators.required,
        ],
      ],
      consumerSecret: [
        this.isUpdate ? this.twitter.consumerSecret : '',
        [
          Validators.required,
        ],
      ],
      oauthToken: [
        this.isUpdate ? this.twitter.oauthToken : '',
        [
          Validators.required,
        ],
      ],
      oauthTokenSecret: [
        this.isUpdate ? this.twitter?.oauthTokenSecret : '',
        [
          Validators.required,
        ],
      ]
    })
  }

  onSubmit(): void {
    if (this.isUpdate) {
      this.update();
    } else {
      this.create();
    }
  }

  onCancel(): void {
    this.modalRef.close({
      success: false,
      value: null,
    });
  }

  private update(): void {
    if (this.form.invalid) {
      CommonUtil.markFormGroupTouched(this.form);
      return;
    }
    const twitter: Twitter = {
      ...this.form.value,
    };
    if (this.twitter?.id) {
      this.twitterService.update(twitter, this.twitter.id, true).subscribe((res) => {
        if (res.status === STATUS.SUCCESS_200) {
          this.toast.success('reddit.updateSuccess');
          this.modalRef.close({
            success: true,
            value: twitter,
          });
        }
      });
    }
  }

  private create(): void {
    if (this.form.invalid) {
      CommonUtil.markFormGroupTouched(this.form);
      return;
    }
    const twitter: Twitter = {
      ...this.form.value,
    };
    console.log(twitter);
    
    this.twitterService.create(twitter, true).subscribe((res) => {
      if (res.status === STATUS.SUCCESS_200) {
        this.toast.success('reddit.createSuccess');
        this.modalRef.close({
          success: true,
          value: twitter,
        });
      }
    },
    (erorr) => {
      this.toast.error('reddit.createFail');
    });
  }

}
