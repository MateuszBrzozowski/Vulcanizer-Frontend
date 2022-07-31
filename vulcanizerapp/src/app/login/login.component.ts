import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ReturnStatement } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from '../app.component';
import { HeaderType } from '../enum/header-type.enum';
import { AuthenticationService } from '../service/authentication.service';
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkIsUserLogin();
  }

  checkIsUserLogin(): void {
    this.isUserLogin = this.authenticationService.isLoggedIn();
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

  d() {
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
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
    if (
      this.userLoginForm.value.email.length !== 0 &&
      this.userLoginForm.value.password.length !== 0
    ) {
      this.authenticationService.login(this.userLoginForm.value).subscribe(
        (response: HttpResponse<User>) => {
          const token = response.headers.get('Jwt-Token');
          this.authenticationService.saveToken(token!);
          this.authenticationService.addUserToLocalCache(response.body!);
          this.isUserLogin = true;
          closeFunction();
        },
        (errorResponse: HttpErrorResponse) => {
          if (errorResponse.status === 401) {
            alert('Email albo hasło jest nieprawidłowe');
          } else {
            alert(errorResponse.error.message);
          }
          // TODO nie zalogoowano, błędne dane, wyświelić komunikat.
        }
      );
    }
  }

  register(closeFunction: any) {
    
  }

  isAllRegisterFielsValid(): boolean {
    return this.isFiledsValid(this.userRegisterForm);
  }

  isPassValid(): boolean {
    if (this.userResetPasswordEmail.valid) {
      return true;
    }
    return false;
  }

  isResetFieldsValid(): boolean {   
    return this.isFiledsValid(this.userResetPassForm);
  }

  isLoginFieldValid() : boolean{
    return this.isFiledsValid(this.userLoginForm);
  }

  isFiledsValid(formGroup : FormGroup) :boolean {
    if(formGroup.valid){
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
    this.userResetPassForm.setValue({firstName : '', lastName : ''})
  }

  resetPassword(closeFunction: any) {
    //TODO - wyslac link do resetu hasla.
    this.closeResetPassTab(closeFunction);
  }


}
