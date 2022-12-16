import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Line } from '@shared/models/social/line.model';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-line-detail',
  templateUrl: './line-detail.component.html',
  styleUrls: ['./line-detail.component.scss']
})
export class LineDetailComponent implements OnInit {

  @Input() line: Line = new Line();
  passwordVisible: boolean = false;

  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private modalRef: NzModalRef
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      channelName: [
        {
          value: this.line.channelName,
          disabled: true
        }
      ],
      channelToken: [
        {
          value: this.line.channelToken,
          disabled: true
        }
      ],
      createdAt: [
        {
          value: this.formatDateToString(this.line.createdAt),
          disabled: true
        }
      ],
      modifiedAt: [
        {
          value: this.formatDateToString(this.line.modifiedAt),
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
