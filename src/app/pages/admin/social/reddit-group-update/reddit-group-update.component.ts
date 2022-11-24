import { RedditServiceService } from './../../../../shared/services/social/reddit-service.service';
import { RedditGroup } from './../../../../shared/models/social/reddit.models';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ToastService } from '@shared/services/helpers/toast.service';
import { STATUS } from '@shared/constants/status.constants';

@Component({
  selector: 'app-reddit-group-update',
  templateUrl: './reddit-group-update.component.html',
  styleUrls: ['./reddit-group-update.component.scss']
})
export class RedditGroupUpdateComponent implements OnInit {

  @Input() isUpdate = false;
  @Input() redditGroup: RedditGroup = new RedditGroup();

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
      name: [
        this.isUpdate ? this.redditGroup.name : '',
      ],
      nameUrl: [
        this.isUpdate ? this.redditGroup.nameUrl : '',
      ],
      description: [
        this.isUpdate ? this.redditGroup.description : '',
      ]
    })
  }

  onSubmit(): void {
    if (this.isUpdate) {
      this.updateRedditGroup();
    } else {
      this.createRedditGroup();
    }
  }

  onCancel(): void {
    this.modalRef.close({
      success: false,
      value: null,
    });
  }

  private updateRedditGroup(): void {
    // if (this.form.invalid) {
    //   CommonUtil.markFormGroupTouched(this.form);
    //   return;
    // }
    const redditGroup: RedditGroup = {
      ...this.form.value,
    };
    if (this.redditGroup?.id) {
      this.redditService.updateRedditGroup(redditGroup, this.redditGroup.id, true).subscribe((res) => {
        if (res.status === STATUS.SUCCESS_200) {
          this.toast.success('reddit.updateSuccess');
          this.modalRef.close({
            success: true,
            value: redditGroup,
          });
        }
      });
    }
  }

  private createRedditGroup(): void {
    // if (this.form.invalid) {
    //   CommonUtil.markFormGroupTouched(this.form);
    //   return;
    // }
    const redditGroup: RedditGroup = {
      ...this.form.value,
    };

    this.redditService.createRedditGroup(redditGroup, true).subscribe((res) => {
      if (res.status === STATUS.SUCCESS_200) {
        this.toast.success('clientInfo.createSuccess');
        this.modalRef.close({
          success: true,
          value: redditGroup,
        });
      }
    });
  }

}
