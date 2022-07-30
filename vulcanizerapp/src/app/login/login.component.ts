import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from '../app.component';
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
    private modalService: NgbModal,

  ) {}

  ngOnInit(): void {}

  open(content: any) {
    this.modalService.open(content);
  }

  d(test : any){
    console.log("Nie wiem co dalej");
    
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
          // sessionStorage.setItem('first-name',complete.firstName);

          alert('Zalogowano!!!');
        },
        (error: HttpErrorResponse) => {
          if (error.status === 401) {
            alert('Email albo hasło jest nieprawidłowe');
          } else if (error.status === 400) {
            alert(error.error.message);
          }
        }
      );
    }
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
}
