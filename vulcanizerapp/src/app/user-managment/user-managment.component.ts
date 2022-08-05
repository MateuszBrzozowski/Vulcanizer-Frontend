import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { IfStmt } from '@angular/compiler';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationType } from '../enum/notification-type.enum';
import { State } from '../enum/states.enum';
import { LoginComponent } from '../login/login.component';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';
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
  public stateSelected: number = 0;

  //account details validation message controls below inputs
  public accountDetailsIsChanged: boolean = false;
  public firstNameIsRequiredMessage: boolean = false;
  public lastNameIsRequiredMessage: boolean = false;
  public emailIsRequiredMessage: boolean = false;
  public emailIsNotValidMessage: boolean = false;
  public phoneIsNotValidMessage: boolean = false;
  public birthDateIsNotValidMessage: boolean = false;

  public updateAccountDetailsButtonVisable : boolean = false; 

  //validation not valid message below inputs
  public passNotSameMessage: boolean = false;
  public passToShortMessage: boolean = false;

  //SavedData
  private firstName: string = '';
  private lastName: string = '';
  private email: string = '';
  private phone: string = '';
  private gender: string = '';
  private birthDate: string = '';

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
  public birthDateControl = new FormControl('');
  public genderMale: boolean = false;
  public genderFemale: boolean = false;
  public genderNull: boolean = false;

  newPasswordGroup: FormGroup = new FormGroup({
    password: new FormControl('', Validators.required),
    passwordRepeat: new FormControl('', Validators.required),
  });

  states = [
    { id: 0, label: '' },
    { id: 1, label: this.stateClass.DOLNOSLASKIE },
    { id: 2, label: this.stateClass.KUJAWSKO_POMORSKIE },
    { id: 3, label: this.stateClass.LUBELSKIE },
    { id: 4, label: this.stateClass.LUBUSKIE },
    { id: 5, label: this.stateClass.LODZKIE },
    { id: 6, label: this.stateClass.MALOPOLSKIE },
    { id: 7, label: this.stateClass.MAZOWIECKIE },
    { id: 8, label: this.stateClass.OPOLSKIE },
    { id: 9, label: this.stateClass.PODKARPACKIE },
    { id: 10, label: this.stateClass.PODLASKIE },
    { id: 11, label: this.stateClass.POMORSKIE },
    { id: 12, label: this.stateClass.SLASKIE },
    { id: 13, label: this.stateClass.SWIETOKRZYSKIE },
    { id: 14, label: this.stateClass.WARMINSKO_MAZURSKIE },
    { id: 15, label: this.stateClass.WIELKOPOLSKIE },
    { id: 16, label: this.stateClass.ZACHODNIO_POMORSKIE },
  ];

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private loginComponent: LoginComponent,
    private notificationService: NotificationService,
    private userService: UserService,
    private stateClass: State
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
    this.saveSavedData();
    this.setFields();
  }

  fillStateFiled() {
    const btnMale = document.getElementById('btnMale');
    const btnFemale = document.getElementById('btnFemale');
    const btnGenderNull = document.getElementById('btnGenderNull');

    if (this.genderMale) {
      btnMale?.classList.add('btn-selected');
    }
    if (this.genderFemale) {
      btnFemale?.classList.add('btn-selected');
    }
    if (this.genderNull) {
      btnGenderNull?.classList.add('btn-selected');
    }
  }

  logout() {
    this.loginComponent.logout();
    this.setContentData();
  }

  setContentData() {
    this.setAllContentToFalse();
    this.isContentData = true;
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
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
    });
    this.birthDateControl.setValue(this.birthDate);
    if (user.gender == 'MALE') {
      this.genderMale = true;
    } else if (user.gender == 'FEMALE') {
      this.genderFemale = true;
    } else if (user.gender == 'UNDEFINED') {
      this.genderNull = true;
    }
  }

  saveSavedData() {
    let user: User = this.authenticationService.getUserFromLocalCahce();
    if (user == null) {
      return;
    }
    if (user.firstName != null) {
      this.firstName = user.firstName;
    }
    if (user.lastName != null) {
      this.lastName = user.lastName;
    }
    if (user.email != null) {
      this.email = user.email;
    }
    if (user.phone != null) {
      this.phone = user.phone;
    }
    if (user.gender != null) {
      this.gender = user.gender;
    }
    if (user.birthDate != null) {
      this.birthDate = user.birthDate;
    }
  }

  accountDetailsValueChanges(){
    if(this.firstName !== this.userAccountDetails.value.firstName){
      this.updateAccountDetailsButtonVisable = true;
      return;
    }
    if(this.lastName !== this.userAccountDetails.value.lastName){
      this.updateAccountDetailsButtonVisable = true;
      return;
    }
    if(this.email !== this.userAccountDetails.value.email){
      this.updateAccountDetailsButtonVisable = true;
      return;
    }
    if(this.phone !== this.userAccountDetails.value.phone){
      this.updateAccountDetailsButtonVisable = true;
      return;
    }
    if(this.birthDate !== this.birthDateControl.value){
      this.updateAccountDetailsButtonVisable = true;
      return;
    }
    this.updateAccountDetailsButtonVisable = false;
  }

  accountDetailsUpdate() {
    if (this.validDataAccoundDetails()) {
      this.userService
        .updateAccountDetails(
          this.userAccountDetails.value.firstName,
          this.userAccountDetails.value.lastName,
          this.userAccountDetails.value.email,
          this.userAccountDetails.value.phone,
          this.getGenderString(),
          this.birthDateControl.value!
        )
        .subscribe(
          (response) => {
            this.notificationService.notify(
              NotificationType.SUCCESS,
              'Dane zostały zapisane'
            );
            this.authenticationService.addUserToLocalCache(response.body!);
          },
          (error: HttpErrorResponse) => {
            this.notificationService.notify(
              NotificationType.ERROR,
              error.error.message
            );
          }
        );
    } else {
      this.notificationService.notify(
        NotificationType.ERROR,
        'Operacja niemożliwa'
      );
    }

    //moze byc invalid bo telefon jest wymagany a nie jest, a chodzi o
    // odpowiednie wyswietlanie przez css :( skoplikowane
  }

  getGenderString(): string {
    if (this.genderFemale) {
      return 'FEMALE';
    }
    if (this.genderMale) {
      return 'MALE';
    }
    return 'UNDEFINED';
  }

  validDataAccoundDetails(): boolean {
    this.validFirstName();
    this.validLastName();
    this.validEmail();
    this.validPhone();
    this.validBirthDate();
    if (
      this.firstNameIsRequiredMessage ||
      this.lastNameIsRequiredMessage ||
      this.emailIsNotValidMessage ||
      this.emailIsRequiredMessage ||
      this.phoneIsNotValidMessage ||
      this.birthDateIsNotValidMessage
    ) {
      return false;
    }
    return true;
  }

  validFirstName() {
    const firstName = this.userAccountDetails.value.firstName;
    if (firstName.length == 0) {
      this.firstNameIsRequiredMessage = true;
      this.updateAccountDetailsButtonVisable = false;
    } else {
      this.firstNameIsRequiredMessage = false;
      this.accountDetailsValueChanges();
    }
  }

  validLastName() {
    const lastName = this.userAccountDetails.value.lastName;
    if (lastName.length == 0) {
      this.lastNameIsRequiredMessage = true;
      this.updateAccountDetailsButtonVisable = false;
    } else {
      this.lastNameIsRequiredMessage = false;
      this.accountDetailsValueChanges();
    }
  }

  validEmail() {
    const email = this.userAccountDetails.value.email.toLowerCase();
    if (email.length == 0) {
      this.emailIsRequiredMessage = true;
      this.updateAccountDetailsButtonVisable = false;
    } else {
      this.emailIsRequiredMessage = false;
    }
    const e = new FormControl(email, [
      Validators.required,
      Validators.pattern(this.emailPattern),
    ]);
    if (!e.valid) {
      this.emailIsNotValidMessage = true;
      this.updateAccountDetailsButtonVisable = false;
    } else {
      this.emailIsNotValidMessage = false;
      this.accountDetailsValueChanges();
    }
  }

  validPhone() {
    let phone: string = this.userAccountDetails.value.phone;
    phone = phone.replace(' ', '');
    let isValid = /^[0-9]+$/.test(phone);
    if (!isValid) {
      this.phoneIsNotValidMessage = true;
      this.updateAccountDetailsButtonVisable = false;
    } else {
      this.phoneIsNotValidMessage = false;
      this.accountDetailsValueChanges();
    }
    if (phone.length == 0) {
      this.phoneIsNotValidMessage = false;
      this.accountDetailsValueChanges();
    }
  }

  dateController() {
    if (this.birthDateControl.value?.length == 4) {
      this.birthDateControl.setValue(this.birthDateControl.value + '-');
    }
    if (this.birthDateControl.value?.length == 7) {
      this.birthDateControl.setValue(this.birthDateControl.value + '-');
    }
    this.accountDetailsValueChanges();
  }

  validBirthDate() {
    const birthDay: string | null = this.birthDateControl.value;

    if (birthDay != null) {
      if (birthDay.length != 0) {
        if (birthDay.length == 10) {
          const first: number = birthDay.indexOf('-');
          const last: number = birthDay.lastIndexOf('-');
          if (first == 4 && last == 7) {
            const year = birthDay.substring(0, 4);
            const month = birthDay.substring(5, 7);
            const day = birthDay.substring(8, 10);
            const isValidYear = /^[0-9]+$/.test(year);
            const isValidMonth = /^[0-9]+$/.test(month);
            const isValidDay = /^[0-9]+$/.test(day);
            if (isValidDay && isValidMonth && isValidYear) {
              const dayInt: number = +day;
              const monthInt: number = +month;
              const yearInt: number = +year;
              const currentYear = new Date().getFullYear();
              if (
                dayInt < 1 ||
                dayInt > 31 ||
                monthInt < 1 ||
                monthInt > 12 ||
                yearInt < 1900 ||
                yearInt > currentYear - 1
              ) {
                this.birthDateIsNotValidMessage = true;
              } else {
                this.birthDateIsNotValidMessage = false;
              }
            } else {
              this.birthDateIsNotValidMessage = true;
            }
          } else {
            this.birthDateIsNotValidMessage = true;
          }
        } else {
          this.birthDateIsNotValidMessage = true;
        }
      }
    }
  }

  accounAddressUpdate() {
    throw 'Method not implement';
  }

  accountUpdatePassword() {
    if (this.checkNewPassword()) {
      this.userService
        .saveNewPassword(this.newPasswordGroup.value.password)
        .subscribe(
          (response: HttpResponse<User>) => {
            const token = response.headers.get('Jwt-Token');
            const scId = response.headers.get('scid');
            const scProperites = response.headers.get('sc_properties');
            this.authenticationService.saveToken(token!);
            this.authenticationService.saveScId(scId!);
            this.authenticationService.saveScProperties(scProperites!);
            this.authenticationService.addUserToLocalCache(response.body!);
            this.notificationService.notify(
              NotificationType.SUCCESS,
              'Hasło zostało zmienione'
            );
          },
          (error: HttpErrorResponse) => {
            this.logout();
            this.notificationService.notify(
              NotificationType.ERROR,
              'Coś poszło nie tak! Sprbuj ponownie później'
            );
          }
        );
      this.newPasswordGroup.setValue({
        password: '',
        passwordRepeat: '',
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

  maleClick(
    buttonMale: HTMLButtonElement,
    buttonFemale: HTMLButtonElement,
    buttonGenderNull: HTMLButtonElement
  ) {
    buttonMale.classList.add('btn-selected');
    buttonFemale.classList.remove('btn-selected');
    buttonGenderNull.classList.remove('btn-selected');
    this.genderMale = true;
    this.genderFemale = false;
    this.genderNull = false;
  }

  femaleClick(
    buttonMale: HTMLButtonElement,
    buttonFemale: HTMLButtonElement,
    buttonGenderNull: HTMLButtonElement
  ) {
    buttonFemale.classList.add('btn-selected');
    buttonMale.classList.remove('btn-selected');
    buttonGenderNull.classList.remove('btn-selected');
    this.genderFemale = true;
    this.genderMale = false;
    this.genderNull = false;
  }

  genderNullClick(
    buttonMale: HTMLButtonElement,
    buttonFemale: HTMLButtonElement,
    buttonGenderNull: HTMLButtonElement
  ) {
    buttonGenderNull.classList.add('btn-selected');
    buttonMale.classList.remove('btn-selected');
    buttonFemale.classList.remove('btn-selected');
    this.genderNull = true;
    this.genderMale = false;
    this.genderFemale = false;
  }
}
