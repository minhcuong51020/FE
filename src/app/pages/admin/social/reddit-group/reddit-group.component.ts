import { RedditServiceService } from './../../../../shared/services/social/reddit-service.service';
import { RedditGroup, RedditGroupRequest } from './../../../../shared/models/social/reddit.models';
import { Component, OnInit } from '@angular/core';
import { PAGINATION } from '@shared/constants/pagination.constants';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '@shared/services/helpers/toast.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '@shared/services/auth/auth.service';
import CommonUtil from '@shared/utils/common-utils';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { RedditGroupUpdateComponent } from '../reddit-group-update/reddit-group-update.component';
import { RedditGroupDetailComponent } from '../reddit-group-detail/reddit-group-detail.component';

@Component({
  selector: 'app-reddit-group',
  templateUrl: './reddit-group.component.html',
  styleUrls: ['./reddit-group.component.scss']
})
export class RedditGroupComponent implements OnInit {

  redditGroups!: RedditGroup[];
  redditGroup!: RedditGroup;

  redditGroupRequest: RedditGroupRequest = {};

  pageIndex = PAGINATION.PAGE_DEFAULT;
  pageSize = 12;
  pageSizeOptions = [12, 24, 48];
  total!: number;
  isFirstFetch = true;
  sortBy!: string;
  isVisible: boolean = false;
  form: FormGroup = new FormGroup({});
  currentUserId!: string | null;
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
    this.authService.loadUserId();
    this.currentUserId = this.authService.getUserId();
  }

  public create(): void {
    const base = CommonUtil.modalBase(
      RedditGroupUpdateComponent,
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

  public update(item: RedditGroup): void {
    const base = CommonUtil.modalBase(
      RedditGroupUpdateComponent,
      {
        isUpdate: true,
        redditGroup: item
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

  public detail(item: RedditGroup): void {
    const base = CommonUtil.modalBase(
      RedditGroupDetailComponent,
      {
        redditGroup: item
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

  public delete(item: RedditGroup): void {
    const deleteForm = CommonUtil.modalConfirm(
      this.translateService,
      'model.titleDelete',
      'model.contentDelete',
      { name: item?.name }
    );
    const modal: NzModalRef = this.modalService.create(deleteForm);
    modal.afterClose.subscribe((result: { success: boolean; data: any }) => {
      if (result?.success) {
        this.redditService.deleteRedditGroup(item.id + "", true).subscribe((res) => {
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
    this.redditGroupRequest.pageIndex = pageNumber;
    this.redditGroupRequest.pageSize = size;
    this.redditGroupRequest.hasPageable = true;
    this.redditGroupRequest.sortBy = sortBy;
    this.redditService.searchRedditGroup(this.redditGroupRequest, isLoading).subscribe(
      (response: any) => {
        const data = response?.body?.data;
        const page = response?.body?.page;
        this.redditGroups = data;
        this.total = page.total || 0;
      },
      (error: any) => {
        this.redditGroups = [];
        this.total = 0;
      }
    )
  }

  private initForm(): void {
    this.form = this.fb.group({
      keyword: this.redditGroupRequest.keyword,
    });
  }

  public getIndex(index: number): number {
    return CommonUtil.getIndex(
      index,
      this.redditGroupRequest.pageIndex,
      this.redditGroupRequest.pageSize
    );
  }

  public onQuerySearch(params: { pageIndex: number; pageSize: number }): void {
    const { pageIndex, pageSize } = params;
    this.redditGroupRequest.pageIndex = pageIndex;
    this.redditGroupRequest.pageSize = pageSize;
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
    this.redditGroupRequest.keyword = keyword;
    this.pageIndex = PAGINATION.PAGE_DEFAULT;
    console.log(this.redditGroupRequest);
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

  hidden(ownerId: string): boolean {
    console.log(ownerId);
    
    this.authService.loadUserId();
    return ownerId === this.authService.getUserId();
  }

}
