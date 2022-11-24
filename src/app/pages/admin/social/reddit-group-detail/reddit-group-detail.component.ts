import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RedditGroup } from '@shared/models/social/reddit.models';
import { RedditServiceService } from '@shared/services/social/reddit-service.service';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-reddit-group-detail',
  templateUrl: './reddit-group-detail.component.html',
  styleUrls: ['./reddit-group-detail.component.scss']
})
export class RedditGroupDetailComponent implements OnInit {

  @Input() redditGroup: RedditGroup = new RedditGroup();

  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private modalRef: NzModalRef,
  ) {
  }

  ngOnInit(): void {
    
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      name: [
        {
          value: this.redditGroup.name,
          disabled: true
        }
      ],
      nameUrl: [
        {
          value: this.redditGroup.nameUrl,
          disabled: true
        }
      ],
      description: [
        {
          value: this.redditGroup.description,
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

}
