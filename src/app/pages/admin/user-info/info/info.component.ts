import { AuthService } from '@shared/services/auth/auth.service';
import { ClientInfo, ClientInfoRequest } from './../../../../shared/models/client-info/client-info.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from '@shared/services/helpers/toast.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ClientInfoService } from '@shared/services/client-info/client-info.service';
import { PAGINATION } from '@shared/constants/pagination.constants';
import CommonUtil from '@shared/utils/common-utils';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { InfoUpdateComponent } from '../info-update/info-update.component';
import { InfoDetailComponent } from '../info-detail/info-detail.component';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  clientInfos!: ClientInfo[];
  clientInfoRequest: ClientInfoRequest = {};

  pageIndex = PAGINATION.PAGE_DEFAULT;
  pageSize = 12;
  pageSizeOptions = [12, 24, 48];
  total!: number;
  isFirstFetch = true;
  sortBy!: string;
  isVisible: boolean = false;
  form: FormGroup = new FormGroup({});

  constructor(
    private router: Router,
    private toast: ToastService,
    private modalService: NzModalService,
    private fb: FormBuilder,
    private translateService: TranslateService,
    private clientInfoService: ClientInfoService,
    private authService: AuthService,
  ) { 
    this.initForm();
  }

  ngOnInit(): void {
    this.loadData(this.pageIndex, this.pageSize);
  }
  

  public create(): void {
    const base = CommonUtil.modalBase(
      InfoUpdateComponent,
      {
        isUpdate: false,
      },
      '50%'
    );
    const modal: NzModalRef = this.modalService.create(base);
    modal.afterClose.subscribe((result) => {
      if (result && result?.success) {
        this.pageIndex = PAGINATION.PAGE_DEFAULT;
        this.loadData(this.pageIndex, this.pageSize);
      }
    });
  }

  public update(item: ClientInfo): void {
    const base = CommonUtil.modalBase(
      InfoUpdateComponent,
      {
        isUpdate: true,
        clientInfo: item
      },
      '50%'
    );
    const modal: NzModalRef = this.modalService.create(base);
    modal.afterClose.subscribe((result) => {
      if (result && result?.success) {
        this.pageIndex = PAGINATION.PAGE_DEFAULT;
        this.loadData(this.pageIndex, this.pageSize);
      }
    });
  }

  public detail(item: ClientInfo): void {
    const base = CommonUtil.modalBase(
      InfoDetailComponent,
      {
        clientInfo: item
      },
      '50%'
    );
    const modal: NzModalRef = this.modalService.create(base);
    modal.afterClose.subscribe((result) => {
      if (result && result?.success) {
        this.pageIndex = PAGINATION.PAGE_DEFAULT;
        this.loadData(this.pageIndex, this.pageSize);
      }
    });
  }

  public delete(clientInfo: ClientInfo): void {
    const deleteForm = CommonUtil.modalConfirm(
      this.translateService,
      'clientInfo.titleDelete',
      'clientInfo.contentDelete',
      { name: clientInfo?.name }
    );
    const modal: NzModalRef = this.modalService.create(deleteForm);
    modal.afterClose.subscribe((result: { success: boolean; data: any }) => {
      if (result?.success) {
        this.clientInfoService.delete(clientInfo.id, true).subscribe((res) => {
                 this.pageIndex = PAGINATION.PAGE_DEFAULT;
                 this.loadData(this.pageIndex, this.pageSize);
                 this.toast.success('clientInfo.successDelete');
               });
      }
    });
  }

  private loadData(
    pageNumber: number,
    size: number,
    sortBy?: string,
    isLoading = true
  ): void {
    this.clientInfoRequest.pageIndex = pageNumber;
    this.clientInfoRequest.pageSize = size;
    this.clientInfoRequest.hasPageable = true;
    this.clientInfoRequest.sortBy = sortBy;
    this.clientInfoService.search(this.clientInfoRequest, isLoading).subscribe(
      (response: any) => {
        const data = response?.body?.data;
        const page = response?.body?.page;
        this.clientInfos = data;
        this.total = page.total || 0;
      },
      (error: any) => {
        this.clientInfos = [];
        this.total = 0;
      }
    )
  }

  private initForm(): void {
    this.form = this.fb.group({
      keyword: this.clientInfoRequest.keyword,
    });
  }

  public getIndex(index: number): number {
    return CommonUtil.getIndex(
      index,
      this.clientInfoRequest.pageIndex,
      this.clientInfoRequest.pageSize
    );
  }

  public onQuerySearch(params: { pageIndex: number; pageSize: number }): void {
    const { pageIndex, pageSize } = params;
    this.clientInfoRequest.pageIndex = pageIndex;
    this.clientInfoRequest.pageSize = pageSize;
    this.loadData(pageIndex, pageSize);
  }

  public onChangeQueryParams(params: NzTableQueryParams): void {
    if (this.isFirstFetch) {
      this.isFirstFetch = false;
      return;
    }

    const { sort } = params;
    const currentSort = sort.find((item) => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    if (sortField && sortOrder) {
      this.sortBy = `${sortField}.${sortOrder === 'ascend' ? 'asc' : 'desc'}`;
    } else {
      this.sortBy = '';
    }
    this.loadData(this.pageIndex, this.pageSize, this.sortBy);
  }

  public resetSearch(): void {
    this.form.get('keyword')?.setValue(null);
    this.searchForm();
  }

  public searchForm(): void {
    const keyword = this.form.get('keyword')?.value;
    this.clientInfoRequest.keyword = keyword;
    this.pageIndex = PAGINATION.PAGE_DEFAULT;
    this.loadData(this.pageIndex, this.pageSize);
  }
}
