import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Email } from '@shared/models/post/email.models';
import { ToastService } from '@shared/services/helpers/toast.service';
import { EmailService } from '@shared/services/posts/email.service';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-email-detail',
  templateUrl: './email-detail.component.html',
  styleUrls: ['./email-detail.component.scss']
})
export class EmailDetailComponent implements OnInit {

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
        {
          value: this.email.email,
          disabled: true
        }
      ],
      password: [
        {
          value: this.email.password,
          disabled: true
        }
      ],
      createdAt: [
        {
          value: this.email.createdAt,
          disabled: true
        }
      ],
      modifiedAt: [
        {
          value: this.email.modifiedAt,
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
