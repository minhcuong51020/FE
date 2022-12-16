import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STATUS } from '@shared/constants/status.constants';
import { VALIDATORS } from '@shared/constants/validators.constant';
import { Email } from '@shared/models/post/email.models';
import { ToastService } from '@shared/services/helpers/toast.service';
import { EmailService } from '@shared/services/posts/email.service';
import CommonUtil from '@shared/utils/common-utils';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-email-update',
  templateUrl: './email-update.component.html',
  styleUrls: ['./email-update.component.scss']
})
export class EmailUpdateComponent implements OnInit {

  @Input() isUpdate = false;
  @Input() email: Email = new Email();
  passwordVisible: boolean = false;

  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private modalRef: NzModalRef,
    private toast: ToastService,
    private emailService: EmailService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      email: [
        this.isUpdate ? this.email.email : '',
        [
          Validators.required,
          Validators.pattern(VALIDATORS.EMAIL),
        ],
      ],
      password: [
        this.isUpdate ? this.email.password : '',
        [
          Validators.required,
        ],
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
    if (this.form.invalid) {
      CommonUtil.markFormGroupTouched(this.form);
      return;
    }
    const email: Email = {
      ...this.form.value,
    };
    if (this.email?.id) {
      this.emailService.update(email, this.email.id, true).subscribe((res) => {
        if (res.status === STATUS.SUCCESS_200) {
          this.toast.success('email.updateSuccess');
          this.modalRef.close({
            success: true,
            value: email,
          });
        }
      });
    }
  }

  private createReddit(): void {
    if (this.form.invalid) {
      CommonUtil.markFormGroupTouched(this.form);
      return;
    }
    const email: Email = {
      ...this.form.value,
    };
    this.emailService.create(email, true).subscribe((res) => {
      if (res.status === STATUS.SUCCESS_200) {
        this.toast.success('email.createSuccess');
        this.modalRef.close({
          success: true,
          value: email,
        });
      }
    });
  }


}
