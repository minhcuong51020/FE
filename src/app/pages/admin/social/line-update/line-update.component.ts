import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STATUS } from '@shared/constants/status.constants';
import { Line } from '@shared/models/social/line.model';
import { ToastService } from '@shared/services/helpers/toast.service';
import { LineService } from '@shared/services/social/line.service';
import CommonUtil from '@shared/utils/common-utils';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-line-update',
  templateUrl: './line-update.component.html',
  styleUrls: ['./line-update.component.scss']
})
export class LineUpdateComponent implements OnInit {

  @Input() isUpdate = false;
  @Input() line: Line = new Line();
  passwordVisible: boolean = false;

  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private modalRef: NzModalRef,
    private toast: ToastService,
    private lineService: LineService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      channelName: [
        this.isUpdate ? this.line.channelName : '',
        [
          Validators.required,
        ],
      ],
      channelToken: [
        this.isUpdate ? this.line.channelToken : '',
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
    const line: Line = {
      ...this.form.value,
    };
    if (this.line?.id) {
      this.lineService.update(line, this.line.id, true).subscribe((res) => {
        if (res.status === STATUS.SUCCESS_200) {
          this.toast.success('line.updateSuccess');
          this.modalRef.close({
            success: true,
            value: line,
          });
        }
      },
      (error) => {
        this.toast.success('line.updateFail');
      });
    }
  }

  private create(): void {
    if (this.form.invalid) {
      CommonUtil.markFormGroupTouched(this.form);
      return;
    }
    const line: Line = {
      ...this.form.value,
    };
    this.lineService.create(line, true).subscribe((res) => {
      if (res.status === STATUS.SUCCESS_200) {
        this.toast.success('line.createSuccess');
        this.modalRef.close({
          success: true,
          value: line,
        });
      }
    },
    (erorr) => {
      this.toast.error('line.createFail');
    });
  }


}
