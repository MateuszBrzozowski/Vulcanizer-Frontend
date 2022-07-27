import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, HostListener, NgModule, OnInit } from '@angular/core';
import { NgModel, FormControl, Validators, FormGroup } from '@angular/forms';
import {
  ModalDismissReasons,
  NgbModal,
  NgbModalConfig,
} from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { Observable, zipAll } from 'rxjs';
import { Business } from './business';
import { BusinessService } from './business.service';
import { UserService } from './user.service';
import { User } from './users';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NgbModalConfig, NgbModal, NgModel],
})
export class AppComponent implements OnInit {
  title = 'vulcanizerapp';
  public users: User[] = [];
  public businesses: Business[] = [];
  closeResult = '';
  emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';

  userRegisterForm: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.email,
      Validators.pattern(this.emailPattern),
    ]),
    password: new FormControl('', Validators.required),
    passwordRepeat: new FormControl('', Validators.required),
  });

  userLoginForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(this.emailPattern),
    ]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private userService: UserService,
    private businessService: BusinessService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private cookieService: CookieService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.getRecommendBusiness();
    const name = sessionStorage.getItem('first-name');
    console.log(name);
    if (name !== null) {
      const login = document.getElementById("login-details");
      login?.classList.remove('hidden');
      const loginRegister = document.getElementById('login-button');
      loginRegister?.classList.add('hidden');
      
    }
  }

  onKeypress(event: any) {
    console.log(event);
    //(keypress)="onKeypress($event)"
  }

  /**
   * getRecommendBusiness
   */
  public getRecommendBusiness(): void {
    this.businessService.getRecommendBusiness().subscribe(
      (response: Business[]) => {
        this.businesses = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  /**
   * getUsers
  :void   */
  public getUsers(): void {
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  open(content: any) {
    this.modalService.open(content);
  }

  registerTab() {
    let tabLogin = document.getElementById('tab-login');
    let tabRegister = document.getElementById('tab-register');
    let formLogin = document.getElementById('form-login');
    let formRegister = document.getElementById('form-register');

    tabLogin?.classList.remove('active');
    tabRegister?.classList.add('active');

    formLogin?.classList.add('hidden');
    formRegister?.classList.remove('hidden');
  }

  loginTab() {
    let tabLogin = document.getElementById('tab-login');
    let tabRegister = document.getElementById('tab-register');
    let formLogin = document.getElementById('form-login');
    let formRegister = document.getElementById('form-register');

    tabLogin?.classList.add('active');
    tabRegister?.classList.remove('active');

    formLogin?.classList.remove('hidden');
    formRegister?.classList.add('hidden');
  }

  login(closeFunction: any) {
    if (
      this.userLoginForm.value.email.length !== 0 &&
      this.userLoginForm.value.password.length !== 0
    ) {
      this.userService.userLogin(this.userLoginForm.value).subscribe(
        (complete) => {
          closeFunction();
          // this.cookieService.set('first-name',complete.firstName);
          sessionStorage.setItem('first-name',complete.firstName);
          alert('Zalogowano!!!');
        },
        (error: HttpErrorResponse) => {
          if (error.status === 401) {
            alert('Email albo hasło jest nieprawidłowe');
          }else if (error.status === 400) {
            alert(error.error.message)
          }
        }
      );
    }

    // this.emailForm.valueChanges.subscribe((value) => {
    //   this.validEmail(value);
    // });

    // if (this.emailForm.value?.length === 0
    //   || this.) {
    //   closeFunction();
    // } else {
    //   if (this.emailForm.invalid) {
    //     console.log('nie moge zamknacc okna bo dane są nie poprawne');
    //   } else {
    //     /// TODO - połączyc sie z backendem i niech sie dzieje magia
    //     closeFunction();
    //   }
    // }
  }

  register(closeFunction: any) {
    response: this.userService
      .registerNewUser(this.userRegisterForm.value)
      .subscribe(
        (complete: any) => {
          closeFunction();
        },
        (error: HttpErrorResponse) => {
          if (error.status === 400) {
            alert(error.error.message);
          } else {
            alert('Something went wrong!');
          }
        }
      );
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
}
