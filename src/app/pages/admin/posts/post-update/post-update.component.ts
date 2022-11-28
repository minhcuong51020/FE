import { ROUTER_ACTIONS, ROUTER_UTILS } from './../../../../shared/utils/router.utils';
import { PostsService } from './../../../../shared/services/posts/posts.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LENGTH_VALIDATOR } from '@shared/constants/validators.constant';
import { IPosts } from '@shared/models/post/posts.model';
import * as tinymce from 'tinymce/tinymce';
import { ToastService } from '@shared/services/helpers/toast.service';

@Component({
  selector: 'app-post-update',
  templateUrl: './post-update.component.html',
  styleUrls: ['./post-update.component.scss']
})

export class PostUpdateComponent implements OnInit {

  action = '';
  ROUTER_ACTIONS = ROUTER_ACTIONS;
  form: FormGroup = new FormGroup({});
  LENGTH_VALIDATOR = LENGTH_VALIDATOR;
  posts!: IPosts;
  id!: string;

  constructor(
    private fb: FormBuilder,
    private toast: ToastService,
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostsService
  ) { 
    
  }

  ngOnInit(): void {
    this.initForm();
    this.initData();
  }

  initData(): void {
    this.route.data.subscribe((res) => {
      this.action = res.action;
    });
    this.route.paramMap.subscribe((response) => {
      this.id = response.get('postId') || '';
      if(this.id) {
        this.postsService.detail(this.id, true).subscribe(
          (response) => {
            if(response && response?.body?.data) {
              this.posts = response?.body?.data;
              this.action = ROUTER_ACTIONS.update;
              this.initForm();
            }
          }
        )
      }
    });
  }

  private initForm() {
    this.form = this.fb.group({
      title: [
        this.action === ROUTER_ACTIONS.update ? this.posts.title : '',

        [
          Validators.required,
          Validators.maxLength(LENGTH_VALIDATOR.TITLE_MAX_LENGTH.MAX),
        ],
      ],
      content: [
        this.action === ROUTER_ACTIONS.update ? this.posts.content : '',

        [Validators.required],
      ],
    })
  }

  onCancel() {
    this.router.navigate([`${ROUTER_UTILS.posts.root}/${ROUTER_UTILS.posts.list}`]);
  }

  onSubmit() {
    const post: IPosts = {
      ...this.form.value,
      title: this.form.get('title')?.value,
      content: this.form.get('content')?.value
    };
    
    if(this.action === ROUTER_ACTIONS.update) {
      this.update(post);
    } else {
      this.create(post);
    }
  }

  create(post: IPosts): void {
    this.postsService.create(post, true).subscribe(
      (res) => {
        if(res.status === 200) {
          this.router.navigate([`${ROUTER_UTILS.posts.root}/${ROUTER_UTILS.posts.list}`]);
          this.toast.success('posts.createSuccess');
        } else {
          this.toast.error('posts.createFail');
        }
      }
    )
  }

  update(post: IPosts): void {
    this.postsService.update(post, this.id, true).subscribe(
      (res) => {
        if(res.status === 200) {
          this.router.navigate([`${ROUTER_UTILS.posts.root}/${ROUTER_UTILS.posts.list}`]);
          this.toast.success('posts.updateSuccess');
        } else {
          this.toast.error('posts.updateFail');
        }
      }
    )
  }

  example_image_upload_handler = (blobInfo: any, progress: any) => new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('file', blobInfo.blob(), blobInfo.filename());
    this.postsService.uploadFile(formData, true).subscribe(
      (response) => {
        console.log(response);
        if(response && response.status === 200) {
          const location = response.body?.data?.location;
          resolve(location);
        } else {
          reject(`Image upload failed due to a XHR Transport error. Code: ${response.status}`);
        }
      }
    )
  });
}
