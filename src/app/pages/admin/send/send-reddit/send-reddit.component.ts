import { AfterContentInit, AfterViewInit, Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IPostRedditRequest } from '@shared/models/post/post-reddit.model';
import { IPosts, Posts } from '@shared/models/post/posts.model';
import { RedditGroup } from '@shared/models/social/reddit.models';
import { ToastService } from '@shared/services/helpers/toast.service';
import { PostsService } from '@shared/services/posts/posts.service';
import { RedditServiceService } from '@shared/services/social/reddit-service.service';
import { ROUTER_UTILS } from '@shared/utils/router.utils';
import { TransferItem } from 'ng-zorro-antd/transfer';
import { htmlToJson } from "@contentstack/json-rte-serializer";

@Component({
  selector: 'app-send-reddit',
  templateUrl: './send-reddit.component.html',
  styleUrls: ['./send-reddit.component.scss']
})
export class SendRedditComponent implements OnInit {

  panels = [
    {
      active: false,
      name: 'Thông tin bài viết',
      disabled: false
    },
  ]
  list: TransferItem[] = [];
  form: FormGroup = new FormGroup({});
  private redditGroups: RedditGroup[] = [];
  postId!: string;
  post!: IPosts;
  $asTransferItems = (data: unknown): TransferItem[] => data as TransferItem[];

  constructor(
    private fb: FormBuilder,
    private toast: ToastService,
    private redditService: RedditServiceService,
    private postService: PostsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((response) => {
      this.postId = response.get('postId') || '';
    });
    this.redditService.searchRedditGroupAuto({}, true).subscribe(
      (res: any) => {
        if(res?.status === 200) {
          const data = res.body?.data;
          this.redditGroups = data;
          this.initTransfer();
        }
      }
    )
    this.postService.detail(this.postId).subscribe(
      (res) => {
        if(res.status === 200 && res.body?.data) {
          this.post = res.body?.data;
        }
      }
    )
  }

  private initTransfer(): void {
    this.redditGroups.forEach(
      (item) => {
        this.list.push({
          key: item?.id,
          title: item?.name || '',
          nameUrl: item?.nameUrl || '',
          direction: 'left'
        })
      }
    )
  }
  
  search(ret: TransferItem) {

  }
  
  onCancel(): void {
    this.router.navigate([`${ROUTER_UTILS.posts.root}`]);
  }

  onSubmit(): void {
    const postRedditIds: string[] = [];
    const postRedditNameUrls: string[] = [];
    this.list.forEach(
      (item) => {
        if(item.direction === 'right') {
          postRedditIds.push(item?.key);
          postRedditNameUrls.push(item?.nameUrl);
        }
      }
    )
    const postRedditRequest: IPostRedditRequest = {
      postId: this.postId,
      redditIds: postRedditIds,
      redditNameUrls: postRedditNameUrls,
    }
    this.postService.sendReddit(postRedditRequest, true).subscribe(
      (res) => {
        if(res.status === 200) {
          this.router.navigate([`${ROUTER_UTILS.posts.root}`]);
          this.toast.success("Đăng bài lên reddit thành công");
        } else {
          this.toast.error("Đăng bài lên reddit thất bại");
        }
      }
    )
  }


  public convertHtmlToRTF() {
    const htmlDomBody = new DOMParser().parseFromString(
      this.post?.content ? this.post.content : '',
      "text/html"
    ).body;
    const jsonValue = htmlToJson(htmlDomBody);
  }


}
