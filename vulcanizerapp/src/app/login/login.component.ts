import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ReturnStatement } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { last } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { AppComponent } from '../app.component';
import { HeaderType } from '../enum/header-type.enum';
import { NotificationType } from '../enum/notification-type.enum';
import { ResetPasswordService } from '../reset-password.service';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';
import { UserService } from '../user.service';
import { User } from '../users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  public users: User[] = [];
  public loginHeaderVisable: boolean = true;
  public isLoginTab: boolean = true;
  public isRegisterTab: boolean = false;
  public isUserLogin: boolean = false;
  public isResetPassTab: boolean = false;
  public isResetPassTabPart2: boolean = false;
  private subscriptions: Subscription[] = [];
  public username: string = 'Username';

  private ACCOUNT_LOCKED: string =
    'Your account has been locked. Please contact administration';
    private ACCOUNT_BANNED: string = 
    'User has active ban'

  userRegisterForm: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.email,
      Validators.pattern(this.emailPattern),
    ]),
    password: new FormControl('', Validators.required),
    passwordRepeat: new FormControl('', Validators.required),
    terms: new FormControl(false, Validators.requiredTrue),
  });

  userLoginForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(this.emailPattern),
    ]),
    password: new FormControl('', Validators.required),
  });

  userResetPassForm: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
  });

  userResetPasswordEmail = new FormControl('', [
    Validators.required,
    Validators.email,
    Validators.pattern(this.emailPattern),
  ]);

  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private authenticationService: AuthenticationService,
    private router: Router,
    private notificationService: NotificationService,
    private resetPasswordService: ResetPasswordService
  ) {}

  ngOnInit(): void {
    this.checkIsUserLogin();
  }

  checkIsUserLogin(): void {
    this.isUserLogin = this.authenticationService.isLoggedIn();
    let user = this.authenticationService.getUserFromLocalCahce();
    if (user != null) {
      if (user.firstName != null) {
        this.username = user.firstName;
      }
    } else {
      this.username = 'Username';
    }
  }

  open(content: any) {
    this.checkIsUserLogin();
    this.modalService.open(content);
    let tabLogin = document.getElementById('tab-login');
    let tabRegister = document.getElementById('tab-register');
    if (this.isLoginTab) {
      tabLogin?.classList.add('active');
      tabRegister?.classList.remove('active');
    } else {
      tabLogin?.classList.remove('active');
      tabRegister?.classList.add('active');
    }
  }

  d() {}

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  logout() {
    this.authenticationService.logOut();
    this.checkIsUserLogin();
    console.log(this.isUserLogin);
    this.ngOnInit();
  }

  registerTab() {
    let tabLogin = document.getElementById('tab-login');
    let tabRegister = document.getElementById('tab-register');
    tabLogin?.classList.remove('active');
    tabRegister?.classList.add('active');

    this.isLoginTab = false;
    this.isRegisterTab = true;
  }

  loginTab() {
    let tabLogin = document.getElementById('tab-login');
    let tabRegister = document.getElementById('tab-register');
    tabLogin?.classList.add('active');
    tabRegister?.classList.remove('active');
    this.isLoginTab = true;
    this.isRegisterTab = false;
  }

  login(closeFunction: any) {
    this.authenticationService.login(this.userLoginForm.value).subscribe(
      (response: HttpResponse<User>) => {
        const token = response.headers.get('Jwt-Token');
        this.authenticationService.saveToken(token!);
        this.authenticationService.addUserToLocalCache(response.body!);
        this.isUserLogin = true;
        this.username = response.body?.firstName!;
        closeFunction();
      },
      (errorResponse: HttpErrorResponse) => {
        if (errorResponse.status === 401) {
          this.notificationService.notify(
            NotificationType.ERROR,
            'Email/haso nieprawidłowe'
          );
        } else if (errorResponse.status === 403) {
          if (errorResponse.error.message === this.ACCOUNT_LOCKED) {
            this.notificationService.notify(
              NotificationType.ERROR,
              'Twoje konto zostało zablokowane! Aby odzyskać dostęp zresetuj hasło!'
            );
          } else if (errorResponse.error.message === this.ACCOUNT_BANNED) {
            this.notificationService.notify(
              NotificationType.ERROR,
              'Twoje konto zostało zbanowane! Po więcej szczegółów skontaktuj się z administracją!'
            );
          } else {
            this.notificationService.notify(
              NotificationType.ERROR,
              'Twoje konto nie zostało aktywowane!'
            );
          }
        } else {
          this.notificationService.notify(
            NotificationType.ERROR,
            'Somethig went wrong'
          );
        }
        // TODO nie zalogoowano, błędne dane, wyświelić komunikat.
      }
    );
  }

  register(closeFunction: any) {
    this.authenticationService.register(this.userRegisterForm.value).subscribe(
      (response: User) => {
        alert('Zarejestrowano');
      },
      (errorResponse: HttpErrorResponse) => {
        alert(errorResponse.error.message);
      }
    );
    this.clearRegisterForm();
    this.loginTab();
    closeFunction();
  }

  clearRegisterForm() {
    this.userRegisterForm.setValue({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordRepeat: '',
      terms: false,
    });
  }

  isAllRegisterFielsValid(): boolean {
    return this.isFiledsValid(this.userRegisterForm);
  }

  isPassValid(): boolean {
    if (this.userResetPasswordEmail.value != null) {
      this.userResetPasswordEmail.setValue(
        this.userResetPasswordEmail.value.toLowerCase()
      );
    }
    if (this.userResetPasswordEmail.valid) {
      return true;
    }
    return false;
  }

  isResetFieldsValid(): boolean {
    return this.isFiledsValid(this.userResetPassForm);
  }

  isLoginFieldValid(): boolean {
    this.userLoginForm.setValue({
      email: this.userLoginForm.value.email.toLowerCase(),
      password: this.userLoginForm.value.password,
    });
    return this.isFiledsValid(this.userLoginForm);
  }

  isFiledsValid(formGroup: FormGroup): boolean {
    if (formGroup.valid) {
      return true;
    }
    return false;
  }

  resetPassForm(): void {
    this.loginHeaderVisable = false;
    this.isLoginTab = false;
    this.isResetPassTab = true;
  }

  resetPassFormStepTwo(): void {
    this.isResetPassTab = false;
    this.isResetPassTabPart2 = true;
  }

  closeResetPassTab(closeFunction: any) {
    closeFunction();
    this.loginHeaderVisable = true;
    this.isLoginTab = true;
    this.isResetPassTab = false;
    this.isResetPassTabPart2 = false;
    this.userResetPasswordEmail.setValue('');
    this.userResetPassForm.setValue({ firstName: '', lastName: '' });
  }

  resetPassword(closeFunction: any) {
    const email = this.userResetPasswordEmail.value;
    const firstName = this.userResetPassForm.value.firstName;
    const lastName = this.userResetPassForm.value.lastName;

    console.log(email);
    console.log(firstName);
    console.log(lastName);

    if (email != null && firstName != null && lastName != null) {
      this.resetPasswordService
        .resetStart(email, firstName, lastName)
        .subscribe(
          (response) => {
            this.notificationService.notify(
              NotificationType.WARNING,
              'Sprawdź wiadomości w twojej skrzynce pocztowej email.'
            );
          },
          (error: HttpErrorResponse) => {
            alert('error');
          }
        );
    }
    this.closeResetPassTab(closeFunction);
  }

  userManagment() {
    this.router.navigateByUrl('/user/managment');
  }
}
