import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClientInfo } from '@shared/models/client-info/client-info.model';
import { ClientInfoService } from '@shared/services/client-info/client-info.service';
import { ToastService } from '@shared/services/helpers/toast.service';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-info-detail',
  templateUrl: './info-detail.component.html',
  styleUrls: ['./info-detail.component.scss']
})
export class InfoDetailComponent implements OnInit {

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
        {
          value: this.clientInfo.name,
          disabled: true
        }
      ],
      address: [
        {
          value: this.clientInfo.address,
          disabled: true
        }
      ],
      email: [
        {
          value: this.clientInfo.email,
          disabled: true
        }
      ],
      phone: [
        {
          value: this.clientInfo.phone,
          disabled: true
        }
      ],
      createdAt: [
        {
          value: this.formatDateToString(this.clientInfo.createdAt),
          disabled: true
        }
      ],
      modifiedAt: [
        {
          value: this.formatDateToString(this.clientInfo.modifiedAt),
          disabled: true
        }
      ],
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
