import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PAGINATION } from '@shared/constants/pagination.constants';
import { Reddit, RedditRequest } from '@shared/models/social/reddit.models';
import { AuthService } from '@shared/services/auth/auth.service';
import { ToastService } from '@shared/services/helpers/toast.service';
import { RedditServiceService } from '@shared/services/social/reddit-service.service';
import CommonUtil from '@shared/utils/common-utils';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { RedditDetailComponent } from '../reddit-detail/reddit-detail.component';
import { RedditUpdateComponent } from '../reddit-update/reddit-update.component';

@Component({
  selector: 'app-reddit',
  templateUrl: './reddit.component.html',
  styleUrls: ['./reddit.component.scss']
})
export class RedditComponent implements OnInit {

  reddits!: Reddit[];
  reddit!: Reddit;

  redditRequest: RedditRequest = {};

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
    private redditService: RedditServiceService,
    private authService: AuthService,
  ) { 
    this.initForm();
  }

  ngOnInit(): void {
    this.loadData(this.pageIndex, this.pageSize);
  }

  public create(): void {
    const base = CommonUtil.modalBase(
      RedditUpdateComponent,
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

  public update(item: Reddit): void {
    const base = CommonUtil.modalBase(
      RedditUpdateComponent,
      {
        isUpdate: true,
        reddit: item
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

  public detail(item: Reddit): void {
    const base = CommonUtil.modalBase(
      RedditDetailComponent,
      {
        reddit: item
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

  public delete(item: Reddit): void {
    const deleteForm = CommonUtil.modalConfirm(
      this.translateService,
      'model.titleDelete',
      'model.contentDelete',
      { name: item?.nameDisplay }
    );
    const modal: NzModalRef = this.modalService.create(deleteForm);
    modal.afterClose.subscribe((result: { success: boolean; data: any }) => {
      if (result?.success) {
        this.redditService.deleteReddit(item.id + "", true).subscribe((res) => {
                 this.pageIndex = PAGINATION.PAGE_DEFAULT;
                 this.loadData(this.pageIndex, this.pageSize);
                 this.toast.success('model.successDelete');
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
    this.redditRequest.pageIndex = pageNumber;
    this.redditRequest.pageSize = size;
    this.redditRequest.hasPageable = true;
    this.redditRequest.sortBy = sortBy;
    this.redditService.searchReddit(this.redditRequest, isLoading).subscribe(
      (response: any) => {
        const data = response?.body?.data;
        const page = response?.body?.page;
        this.reddits = data;
        console.log(this.reddits);
        
        this.total = page.total || 0;
      },
      (error: any) => {
        this.reddits = [];
        this.total = 0;
      }
    )
  }

  private initForm(): void {
    this.form = this.fb.group({
      keyword: this.redditRequest.keyword,
    });
  }

  public getIndex(index: number): number {
    return CommonUtil.getIndex(
      index,
      this.redditRequest.pageIndex,
      this.redditRequest.pageSize
    );
  }

  public onQuerySearch(params: { pageIndex: number; pageSize: number }): void {
    const { pageIndex, pageSize } = params;
    this.redditRequest.pageIndex = pageIndex;
    this.redditRequest.pageSize = pageSize;
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
    this.redditRequest.keyword = keyword;
    this.pageIndex = PAGINATION.PAGE_DEFAULT;
    console.log(this.redditRequest);
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
