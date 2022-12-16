import { ClientInfoService } from '@shared/services/client-info/client-info.service';
import { ClientInfo } from './../../../../shared/models/client-info/client-info.model';
import { Component, Input, OnInit } from '@angular/core';
import { ToastService } from '@shared/services/helpers/toast.service';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import CommonUtil from '@shared/utils/common-utils';
import { STATUS } from '@shared/constants/status.constants';
import { VALIDATORS } from '@shared/constants/validators.constant';

@Component({
  selector: 'app-info-update',
  templateUrl: './info-update.component.html',
  styleUrls: ['./info-update.component.scss']
})
export class InfoUpdateComponent implements OnInit {

  @Input() isUpdate = false;
  @Input() clientInfo: ClientInfo = new ClientInfo();

  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private modalRef: NzModalRef,
    private toast: ToastService,
    private clientInfoService: ClientInfoService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      name: [
        this.isUpdate ? this.clientInfo.name : '',
        [
          Validators.required
        ]
      ],
      address: [
        this.isUpdate ? this.clientInfo.address : '',
        [
          Validators.required
        ]
      ],
      email: [
        this.isUpdate ? this.clientInfo.email : '',
        [
          Validators.required,
          Validators.pattern(VALIDATORS.EMAIL),
        ],
      ],
      phone: [
        this.isUpdate ? this.clientInfo.phone : '',
        [
          Validators.required,
          Validators.pattern(VALIDATORS.PHONE),
          Validators.maxLength(10)
        ]
      ],
    })
  }

  onSubmit(): void {
    if (this.isUpdate) {
      this.updateClientInfo();
    } else {
      this.createClientInfo();
    }
  }

  onCancel(): void {
    this.modalRef.close({
      success: false,
      value: null,
    });
  }

  private updateClientInfo(): void {
    if (this.form.invalid) {
      CommonUtil.markFormGroupTouched(this.form);
      return;
    }
    const clientInfo: ClientInfo = {
      ...this.form.value,
    };
    if (this.clientInfo?.id) {
      this.clientInfoService.update(clientInfo, this.clientInfo.id, true).subscribe((res) => {
        if (res.status === STATUS.SUCCESS_200) {
          this.toast.success('clientInfo.updateSuccess');
          this.modalRef.close({
            success: true,
            value: clientInfo,
          });
        }
      });
    }
  }

  private createClientInfo(): void {
    if (this.form.invalid) {
      CommonUtil.markFormGroupTouched(this.form);
      return;
    }
    const clientInfo: ClientInfo = {
      ...this.form.value,
    };

    this.clientInfoService.create(clientInfo, true).subscribe((res) => {
      if (res.status === STATUS.SUCCESS_200) {
        this.toast.success('clientInfo.createSuccess');
        this.modalRef.close({
          success: true,
          value: clientInfo,
        });
      }
    });
  }

}
