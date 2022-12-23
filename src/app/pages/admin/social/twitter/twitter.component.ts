import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PAGINATION } from '@shared/constants/pagination.constants';
import { Twitter, TwitterRequest } from '@shared/models/social/twitter.model';
import { AuthService } from '@shared/services/auth/auth.service';
import { ToastService } from '@shared/services/helpers/toast.service';
import { TwitterService } from '@shared/services/social/twitter.service';
import CommonUtil from '@shared/utils/common-utils';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { TwitterDetailComponent } from '../twitter-detail/twitter-detail.component';
import { TwitterUpdateComponent } from '../twitter-update/twitter-update.component';

@Component({
  selector: 'app-twitter',
  templateUrl: './twitter.component.html',
  styleUrls: ['./twitter.component.scss']
})
export class TwitterComponent implements OnInit {

  twitters!: Twitter[];
  twitter!: Twitter;

  twitterRequest: TwitterRequest = {};

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
    private twitterService: TwitterService,
    private authService: AuthService,
  ) { 
    this.initForm();
  }

  ngOnInit(): void {
    this.loadData(this.pageIndex, this.pageSize);
  }

  public create(): void {
    const base = CommonUtil.modalBase(
      TwitterUpdateComponent,
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

  public update(item: Twitter): void {
    const base = CommonUtil.modalBase(
      TwitterUpdateComponent,
      {
        isUpdate: true,
        twitter: item
      },
      '70%'
    );
    const modal: NzModalRef = this.modalService.create(base);
    modal.afterClose.subscribe((result) => {
      if (result && result?.success) {
        this.pageIndex = PAGINATION.PAGE_DEFAULT;
        this.loadData(this.pageIndex, this.pageSize);
      }
    });
  }

  public detail(item: Twitter): void {
    const base = CommonUtil.modalBase(
      TwitterDetailComponent,
      {
        twitter: item
      },
      '70%'
    );
    const modal: NzModalRef = this.modalService.create(base);
    modal.afterClose.subscribe((result) => {
      if (result && result?.success) {
        this.pageIndex = PAGINATION.PAGE_DEFAULT;
        this.loadData(this.pageIndex, this.pageSize);
      }
    });
  }

  public delete(item: Twitter): void {
    const deleteForm = CommonUtil.modalConfirm(
      this.translateService,
      'twitter.titleDelete',
      'twitter.contentDelete',
      { name: item?.name }
    );
    const modal: NzModalRef = this.modalService.create(deleteForm);
    modal.afterClose.subscribe((result: { success: boolean; data: any }) => {
      if (result?.success) {
        this.twitterService.delete(item.id + "", true).subscribe((res) => {
                 this.pageIndex = PAGINATION.PAGE_DEFAULT;
                 this.loadData(this.pageIndex, this.pageSize);
                 this.toast.success('twitter.successDelete');
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
    this.twitterRequest.pageIndex = pageNumber;
    this.twitterRequest.pageSize = size;
    this.twitterRequest.hasPageable = true;
    this.twitterRequest.sortBy = sortBy;
    this.twitterService.search(this.twitterRequest, isLoading).subscribe(
      (response: any) => {
        const data = response?.body?.data;
        const page = response?.body?.page;
        this.twitters = data;
        this.total = page.total || 0;
      },
      (error: any) => {
        this.twitters = [];
        this.total = 0;
      }
    )
  }

  private initForm(): void {
    this.form = this.fb.group({
      keyword: this.twitterRequest.keyword,
    });
  }

  public getIndex(index: number): number {
    return CommonUtil.getIndex(
      index,
      this.twitterRequest.pageIndex,
      this.twitterRequest.pageSize
    );
  }

  public onQuerySearch(params: { pageIndex: number; pageSize: number }): void {
    const { pageIndex, pageSize } = params;
    this.twitterRequest.pageIndex = pageIndex;
    this.twitterRequest.pageSize = pageSize;
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
    this.twitterRequest.keyword = keyword;
    this.pageIndex = PAGINATION.PAGE_DEFAULT;
    console.log(this.twitterRequest);
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
