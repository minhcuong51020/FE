import { PostsService } from './../../../../shared/services/posts/posts.service';
import { PostRequest, Posts } from './../../../../shared/models/post/posts.model';
import { Component, OnInit } from '@angular/core';
import { PAGINATION } from '@shared/constants/pagination.constants';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '@shared/services/helpers/toast.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { TranslateService } from '@ngx-translate/core';
import CommonUtil from '@shared/utils/common-utils';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ROUTER_UTILS } from '@shared/utils/router.utils';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  postList!: Posts[];
  postRequest: PostRequest = {};

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
    private postsService: PostsService,
  ) { 
    this.initForm();
  }
  
  ngOnInit(): void {
    this.loadData(this.pageIndex, this.pageSize);
  }

  public update(post: Posts): void {
    this.router.navigate([`${ROUTER_UTILS.posts.root}/${post?.id}/update`]);
  }

  public create(): void {
    this.router.navigate([`${ROUTER_UTILS.posts.root}/create`]);
  }

  public delete(post: Posts): void {
    const deleteForm = CommonUtil.modalConfirm(
      this.translateService,
      'model.titleDelete',
      'model.contentDelete',
      { name: post?.title }
    );
    const modal: NzModalRef = this.modalService.create(deleteForm);
    modal.afterClose.subscribe((result: { success: boolean; data: any }) => {
      if (result?.success) {
        this.postsService.delete(post.id, true).subscribe((res) => {
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
    this.postRequest.pageIndex = pageNumber;
    this.postRequest.pageSize = size;
    this.postRequest.hasPageable = true;
    this.postRequest.sortBy = sortBy;
    this.postsService.search(this.postRequest, isLoading).subscribe(
      (response: any) => {
        const data = response?.body?.data;
        const page = response?.body?.page;
        this.postList = data;
        this.total = page.total || 0;
      },
      (error: any) => {
        this.postList = [];
        this.total = 0;
      }
    )
  }

  private initForm(): void {
    this.form = this.fb.group({
      keyword: this.postRequest.keyword,
    });
  }

  public getIndex(index: number): number {
    return CommonUtil.getIndex(
      index,
      this.postRequest.pageIndex,
      this.postRequest.pageSize
    );
  }

  public onQuerySearch(params: { pageIndex: number; pageSize: number }): void {
    const { pageIndex, pageSize } = params;
    this.postRequest.pageIndex = pageIndex;
    this.postRequest.pageSize = pageSize;
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
    this.postRequest.keyword = keyword;
    this.pageIndex = PAGINATION.PAGE_DEFAULT;
    this.loadData(this.pageIndex, this.pageSize);
  }

}
