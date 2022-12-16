import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PAGINATION } from '@shared/constants/pagination.constants';
import { Line, LineRequest } from '@shared/models/social/line.model';
import { AuthService } from '@shared/services/auth/auth.service';
import { ToastService } from '@shared/services/helpers/toast.service';
import { EmailService } from '@shared/services/posts/email.service';
import { LineService } from '@shared/services/social/line.service';
import CommonUtil from '@shared/utils/common-utils';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { LineDetailComponent } from '../line-detail/line-detail.component';
import { LineUpdateComponent } from '../line-update/line-update.component';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent implements OnInit {

  lines!: Line[];
  line!: Line;

  lineRequest: LineRequest = {};

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
    private lineService: LineService,
    private authService: AuthService,
  ) { 
    this.initForm();
  }

  ngOnInit(): void {
    this.loadData(this.pageIndex, this.pageSize);
  }

  public create(): void {
    const base = CommonUtil.modalBase(
      LineUpdateComponent,
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

  public update(item: Line): void {
    const base = CommonUtil.modalBase(
      LineUpdateComponent,
      {
        isUpdate: true,
        line: item
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

  public detail(item: Line): void {
    const base = CommonUtil.modalBase(
      LineDetailComponent,
      {
        line: item
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

  public delete(item: Line): void {
    const deleteForm = CommonUtil.modalConfirm(
      this.translateService,
      'line.titleDelete',
      'line.contentDelete',
      { name: item?.channelName }
    );
    const modal: NzModalRef = this.modalService.create(deleteForm);
    modal.afterClose.subscribe((result: { success: boolean; data: any }) => {
      if (result?.success) {
        this.lineService.delete(item.id + "", true).subscribe((res) => {
                 this.pageIndex = PAGINATION.PAGE_DEFAULT;
                 this.loadData(this.pageIndex, this.pageSize);
                 this.toast.success('line.successDelete');
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
    this.lineRequest.pageIndex = pageNumber;
    this.lineRequest.pageSize = size;
    this.lineRequest.hasPageable = true;
    this.lineRequest.sortBy = sortBy;
    this.lineService.search(this.lineRequest, isLoading).subscribe(
      (response: any) => {
        const data = response?.body?.data;
        const page = response?.body?.page;
        this.lines = data;
        console.log(this.lines);
        
        this.total = page.total || 0;
      },
      (error: any) => {
        this.lines = [];
        this.total = 0;
      }
    )
  }

  private initForm(): void {
    this.form = this.fb.group({
      keyword: this.lineRequest.keyword,
    });
  }

  public getIndex(index: number): number {
    return CommonUtil.getIndex(
      index,
      this.lineRequest.pageIndex,
      this.lineRequest.pageSize
    );
  }

  public onQuerySearch(params: { pageIndex: number; pageSize: number }): void {
    const { pageIndex, pageSize } = params;
    this.lineRequest.pageIndex = pageIndex;
    this.lineRequest.pageSize = pageSize;
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
    this.lineRequest.keyword = keyword;
    this.pageIndex = PAGINATION.PAGE_DEFAULT;
    console.log(this.lineRequest);
    this.loadData(this.pageIndex, this.pageSize);
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
