import { STRING_TYPE } from '@angular/compiler';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { State } from '../enum/states.enum';
import { LoginComponent } from '../login/login.component';
import { AuthenticationService } from '../service/authentication.service';
import { UserService } from '../user.service';
import { User } from '../users';

@Component({
  selector: 'app-user-managment',
  templateUrl: './user-managment.component.html',
  styleUrls: ['./user-managment.component.css'],
})
export class UserManagmentComponent implements OnInit, AfterViewInit {
  emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  public username: string = '';
  public isContentData: boolean = true;
  public isContentVisits: boolean = false;
  public isContentFavorits: boolean = false;
  public isContentBusiness: boolean = false;
  public passTouched: boolean = false;

  //validation not valid message below inputs
  public passNotSameMessage: boolean = false;
  public passToShortMessage: boolean = false;

  userAccountDetails: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(this.emailPattern),
    ]),
    phone: new FormControl('', [Validators.maxLength(13)]),
  });

  newPasswordGroup: FormGroup = new FormGroup({
    password: new FormControl('', Validators.required),
    passwordRepeat: new FormControl('', Validators.required),
  });

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private loginComponent: LoginComponent,
    private userService: UserService
  ) {
    if (!this.authenticationService.isLoggedIn()) {
      this.router.navigateByUrl('');
    }
  }

  ngAfterViewInit() {
    this.fillStateFiled();
  }

  ngOnInit(): void {
    let user: User = this.authenticationService.getUserFromLocalCahce();
    this.username = user.firstName + ' ' + user.lastName;
    this.setFields();
  }

  fillStateFiled() {
    let selectState = document.getElementById('state');
    let listOfStates: Array<string> = new State().getAllState();

    for (let index = 0; index < listOfStates.length; index++) {
      let option = document.createElement('option');
      option.innerHTML = listOfStates[index];
      selectState?.appendChild(option);
    }
  }

  logout() {
    this.loginComponent.logout();
    this.loginComponent;
    window.location.reload();
    this.router.navigateByUrl('');
    this.setContentData();
  }

  setContentData() {
    this.setAllContentToFalse();
    this.isContentData = true;

    window.location.reload();
  }

  setContentVisits() {
    this.setAllContentToFalse();
    this.isContentVisits = true;
  }

  setContentFavorits() {
    this.setAllContentToFalse();
    this.isContentFavorits = true;
  }

  setContentBusiness() {
    this.setAllContentToFalse();
    this.isContentBusiness = true;
  }

  setAllContentToFalse() {
    this.isContentData = false;
    this.isContentVisits = false;
    this.isContentFavorits = false;
    this.isContentBusiness = false;
  }

  setFields() {
    let user: User = this.authenticationService.getUserFromLocalCahce();
    this.userAccountDetails.setValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
    });
  }

  accountDetailsUpdate() {
    throw 'Method not implement';
    //moze byc invalid bo telefon jest wymagany a nie jest, a chodzi o
    // odpowiednie wyswietlanie przez css :( skoplikowane
  }

  accounAddressUpdate() {
    throw 'Method not implement';
  }

  accountUpdatePassword() {
    if (this.checkNewPassword()) {
      this.userService.saveNewPassword(this.newPasswordGroup.value.password);
      this.newPasswordGroup.setValue({
        password : '',
        passwordRepeat: ''
      });
      this.passTouched = false;
    }
  }

   /**
   * checkNewPassword
   * 
   * Validate password with specific logic
   */
  checkNewPassword(): boolean {
    let pass = this.newPasswordGroup.value.password;
    let passRepeat = this.newPasswordGroup.value.passwordRepeat;
    console.log(pass);
    console.log(passRepeat);

    if (pass !== passRepeat) {
      this.passNotSameMessage = true;
      return false;
    } else {
      this.passNotSameMessage = false;
    }
    if (pass.length < 6) {
      this.passToShortMessage = true;
      return false;
    } else {
      this.passToShortMessage = false;
    }
    return true;
  }

  newPassValid(): boolean {
    return this.newPasswordGroup.valid;
  }

  passTouch() {
    if (!this.passTouched) {
      this.passTouched = true;
    }
  }
}
