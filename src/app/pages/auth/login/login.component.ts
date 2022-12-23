import { ILoginRequest } from './../../../shared/models/user/login.model';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  LOCAL_STORAGE,
  SESSION_STORAGE,
} from '@shared/constants/local-session-cookies.constants';
import { LENGTH_VALIDATOR } from '@shared/constants/validators.constant';
import { AuthService } from '@shared/services/auth/auth.service';
import { ToastService } from '@shared/services/helpers/toast.service';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { User } from '@shared/models/user/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: UntypedFormGroup;
  passwordVisible = false;
  password?: string;
  LENGTH_VALIDATOR = LENGTH_VALIDATOR;
  currentUser: any;
  role: any;
  registerForm!: FormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private fbg: FormBuilder,
    private authService: AuthService,
    private localStorage: LocalStorageService,
    private sessionStorage: SessionStorageService,
    private translateService: TranslateService,
    private toast: ToastService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    
    this.loginForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.maxLength(LENGTH_VALIDATOR.USERNAME_MAX_LENGTH.MAX),
          Validators.minLength(1),
        ],
      ],
      password: ['', [Validators.required]],
    });

    this.registerForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.maxLength(LENGTH_VALIDATOR.USERNAME_MAX_LENGTH.MAX),
          Validators.minLength(1),
        ],
      ],
      password: [
        '', [Validators.required]
      ],
      rePassword: [
        '', [Validators.required]
      ],
      fullName: [
        '', [Validators.required]
      ]
    })
  }

  get f() {
    return this.loginForm.controls;
  }

  submitRegister(): void {
    if(!this.registerForm.invalid) {
      const user: User = {
        username: this.registerForm.get('username')?.value,
        password: this.registerForm.get('password')?.value,
        fullName: this.registerForm.get('fullName')?.value,
      }
      console.log(user);
      
      if(user.password !== this.registerForm.get('rePassword')?.value) {
        this.toast.error("Mật khẩu không khớp, vui lòng nhập lại!");
      } else {
        this.authService.register(user).subscribe(
          (res) => {
            this.toast.success("Đăng ký tài khoản thành công!");
            const loginRequest: ILoginRequest = {
              username: this.registerForm.get('username')?.value,
              password: this.registerForm.get('password')?.value
            }
            this.authService.login(loginRequest).subscribe(
              (token) => {
                if (token) {
                  const loginResponse = token?.body?.data;
                  if(loginResponse && loginResponse.accessToken) {
                    this.authService.saveToken(loginResponse.accessToken);
                  }
                  if(loginResponse && loginResponse.id) {
                    this.authService.saveUserId(loginResponse?.id);
                  }
                  if(loginResponse && loginResponse.fullName) {
                    this.authService.savefullName(loginResponse?.fullName);
                  }
                  this.router.navigate([`dashboard`]);
                  this.toast.success('model.login.success.authenticate');
                }
              },
              (error) => {
                this.toast.error('Đăng ký tài khoản thất bại!');
              });
          },
          (erorr) => {
            this.toast.error("Đăng ký tài khoản thất bại!");
          }
        )
      }
    }
  }

  submitForm(): void {
    if (this.loginForm.valid) {
        const loginRequest: ILoginRequest = {
          username: this.f.username.value,
          password: this.f.password.value
        }
        console.log(loginRequest);
        this.authService.login(loginRequest).subscribe(
          (token) => {
            if (token) {
              const loginResponse = token?.body?.data;
              if(loginResponse && loginResponse.accessToken) {
                this.authService.saveToken(loginResponse.accessToken);
              }
              if(loginResponse && loginResponse.id) {
                this.authService.saveUserId(loginResponse?.id);
              }
              if(loginResponse && loginResponse.fullName) {
                this.authService.savefullName(loginResponse?.fullName);
              }
              this.router.navigate([`dashboard`]);
              this.toast.success('model.login.success.authenticate');
            }
          },
          (error) => {
            this.toast.error('model.login.error.unauthorized');
          });
    } else {
      Object.values(this.loginForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  isTokenUnexpired(): void {
    if(this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    } else {
      console.log("chua login");
      this.router.navigate(['home']);
    }
  }
}
