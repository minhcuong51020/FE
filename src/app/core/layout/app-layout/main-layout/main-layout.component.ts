import { Component, HostListener, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { LANGUAGES_CONST } from '@shared/constants/base.constant';
import { LOCAL_STORAGE } from '@shared/constants/local-session-cookies.constants'
import { AuthService } from '@shared/services/auth/auth.service';
import { LoadingService } from '@shared/services/helpers/loading.service';
import { ToastService } from '@shared/services/helpers/toast.service';
import * as moment from 'moment';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { LocalStorageService } from 'ngx-webstorage';
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  visible = false;
  isCollapsed = false;
  currentUser: any;
  currentLanguage = '';
  title = '';
  isDashboard = false;
  LANGUAGES_CONST = LANGUAGES_CONST;
  VI = LANGUAGES_CONST.VI.code;
  EN = LANGUAGES_CONST.EN.code;
  visibleMenu = false;

  constructor(
    public loadingService: LoadingService,
    private authService: AuthService,
    private router: Router,
    private toast: ToastService,
    private localStorage: LocalStorageService,
    private modalService: NzModalService
  ) {
    this.currentLanguage =
      this.localStorage.retrieve(LOCAL_STORAGE.LANGUAGE) ||
      LANGUAGES_CONST.VI.code;
    this.router.events.subscribe((event) => {
      if (event instanceof ActivationEnd) {
        if (event?.snapshot?.data?.title) {
          this.title =
            event?.snapshot?.data?.title.toString() || 'common.title';
        }
        if (event?.snapshot?.url[0]?.path) {
          this.isDashboard = event?.snapshot?.url[0]?.path === 'dashboard';
        }
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    if (event.target.innerWidth <= 1366) {
      this.isCollapsed = true;
    }
  }

  ngOnInit(): void {
    const profile = this.localStorage.retrieve(LOCAL_STORAGE.PROFILE);
    this.currentUser = profile;
    //check login
    const token = this.authService.getToken();
    if(token && this.authService.isLoggedIn()) {
      this.authService.loadfullName();
      this.currentUser = this.authService.getfullName();
    } else {
      this.router.navigate([`home`])
    }
  }

  getShortName(fullName: string): string {
    if (!fullName) {
      return 'User Name';
    }
    const list = fullName.split(' ');
    if (list.length > 5) {
      return list[0] + ' ' + list[list.length - 1];
    } else {
      return fullName;
    }
    return "Hello";
  }

  logout(): void {
    this.authService.logout();
      this.authService.logout();
      this.router.navigate(['/home']);
      this.toast.success('model.logout.success.authenticate');
  }

  onChangeLanguage(language: string): void {
    if (this.currentLanguage !== language) {
      this.localStorage.store(LOCAL_STORAGE.LANGUAGE, language);
      location.reload();
    } else {
      this.visible = false;
    }
  }

  navigateDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  formatDate(date: any): string {
    if (!date) {
      return '-';
    }
    return moment(date).format('DD/MM/yyyy');
  }
}
