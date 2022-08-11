import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserBusiness } from '../business';
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
  private responseMessageInvalidDate: string =
    'Invalid date or format (YYYY-MM-DD)';
  private responseMessageEmailExist: string = 'Email is exist.';

  public username: string = '';
  public isContentData: boolean = true;
  public isContentVisits: boolean = false;
  public isContentFavorits: boolean = false;
  public isContentBusiness: boolean = false;
  public isAdmin: boolean = false;
  public passTouched: boolean = false;

  //account details validation message controls below inputs
  public accountDetailsIsChanged: boolean = false;
  public firstNameIsRequiredMessage: boolean = false;
  public lastNameIsRequiredMessage: boolean = false;
  public emailIsRequiredMessage: boolean = false;
  public emailIsNotValidMessage: boolean = false;
  public emailExist: boolean = false;
  public phoneIsNotValidMessage: boolean = false;
  public birthDateIsNotValidMessage: boolean = false;

  public updateAccountDetailsButtonVisable: boolean = false;

  //address validation message controls below inputs
  public postalCodeNotValidMessage: boolean = false;

  public updateAddressButtonVisable: boolean = false;

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

  //SavedData Address
  private addressLine: string = '';
  private city: string = '';
  private postalCode: string = '';
  public stateSelected: number = 0;
  public countrySelected: number = 0;

  ///
  //Create Business
  ///
  //creating states
  public businessList: boolean = false;
  public createBusinessStart: boolean = true;
  public createBusinessNip: boolean = false;
  public createBusinessDetails: boolean = false;
  public createBusinessPhones: boolean = false;
  public createBusinessDescription: boolean = false;
  public createBusinessAddressCompanyBranch: boolean = false;
  public createBusinessPhoneCompanyBranch: boolean = false;
  public createBusinessSummary: boolean = false;
  public createBusinessEnd: boolean = false;

  //validation message below inputs
  public emptyUserDetailsMessage: boolean = false;
  public emptyPhoneNumberMessage: boolean = false;
  public emptyBirthDateMessage: boolean = false;
  public emptyAddressStreeMessage: boolean = false;
  public emptyAddressCityMessage: boolean = false;
  public emptyAddressPostalCodeMessage: boolean = false;
  public emptyAddressStateMessage: boolean = false;
  public emptyAddressCountryMessage: boolean = false;
  public nipIsNotValidMessage: boolean = false;
  public businessNameIsRequiredMessage: boolean = false;
  public companyBranchNameIsRequiredMessage: boolean = false;
  public businessStreetIsRequiredMessage: boolean = false;
  public companyBranchStreetIsRequiredMessage: boolean = false;
  public businessCityIsRequiredMessage: boolean = false;
  public companyBranchCityIsRequiredMessage: boolean = false;
  public businessPostalCodeIsRequiredMessage: boolean = false;
  public companyBranchPostalCodeIsRequiredMessage: boolean = false;
  public businessPostalCodeIsNotValidMessage: boolean = false;
  public companyBranchPostalCodeIsNotValidMessage: boolean = false;
  public businessStateIsRequiredMessage: boolean = false;
  public companyBranchStateIsRequiredMessage: boolean = false;
  public businessCountryIsRequiredMessage: boolean = false;
  public companyBranchCountryIsRequiredMessage: boolean = false;
  public phoneFirstIsNotValidMessage: boolean = false;
  public phoneCompanyBranchIsNotValidMessage: boolean = false;
  public phoneFirstIsRequiredMessage: boolean = false;
  public phoneCompanyBranchIsRequiredMessage: boolean = false;

  public busienssDataNIP: string = '';
  public companyBranchName: string = '';
  public companyBranchDataDescription: string = '';
  public busienssDataPhoneFirst: string = '';
  public companyBranchDataPhone: string = '';
  public busienssDataStateId: number = 0;
  public companyBranchDataStateId: number = 0;
  public busienssDataCountryId: number = 0;
  public companyBranchDataCountryId: number = 0;

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
  private genderSelectedString: string = '';

  userAddress: FormGroup = new FormGroup({
    addressLine: new FormControl(''),
    city: new FormControl(''),
    postalCode: new FormControl(''),
  });

  public stateNewSelected: number = 0;
  public countryNewSelected: number = 0;

  newPasswordGroup: FormGroup = new FormGroup({
    password: new FormControl('', Validators.required),
    passwordRepeat: new FormControl('', Validators.required),
  });

  businessDetails: FormGroup = new FormGroup({
    name: new FormControl(''),
    addressLine: new FormControl(''),
    city: new FormControl(''),
    postalCode: new FormControl(''),
  });

  companyBranchDetails: FormGroup = new FormGroup({
    addressLine: new FormControl(''),
    city: new FormControl(''),
    postalCode: new FormControl(''),
  });

  countries = [
    { id: 0, label: '' },
    { id: 1, label: 'Polska' },
  ];

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

  columnsToDisplay: string[] = ['position','name', 'status'];
  public businesses: UserBusiness[] = new Array<UserBusiness>;


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
    this.isAdmin = this.authenticationService.isAdmin();
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

  adminManagment(){
    this.router.navigateByUrl('/admin/managment')
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
    this.createBusinessStart = true;
    this.createBusinessNip = false;
    this.createBusinessDetails = false;
    this.createBusinessDescription = false;
    this.createBusinessSummary = false;
    this.createBusinessEnd = false;

    this.emptyUserDetailsMessage = false;
    this.emptyPhoneNumberMessage = false;
    this.emptyBirthDateMessage = false;
    this.emptyAddressStreeMessage = false;
    this.emptyAddressCityMessage = false;
    this.emptyAddressPostalCodeMessage = false;
    this.emptyAddressStateMessage = false;
    this.emptyAddressCountryMessage = false;
    this.checkUserBusinesses();
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
      this.genderSelectedString = 'MALE';
    } else if (user.gender == 'FEMALE') {
      this.genderFemale = true;
      this.genderSelectedString = 'FEMALE';
    } else if (user.gender == 'UNDEFINED') {
      this.genderNull = true;
      this.genderSelectedString = 'UNDEFINED';
    }

    //address
    this.userAddress.setValue({
      addressLine: this.addressLine,
      city: this.city,
      postalCode: this.postalCode,
    });
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
    } else {
      this.phone = '';
    }
    if (user.gender != null) {
      this.gender = user.gender;
    } else {
      this.gender = 'UNDEFINED';
    }
    if (user.birthDate != null) {
      this.birthDate = user.birthDate;
    } else {
      this.birthDate = '';
    }

    //address
    if (user.address != null) {
      if (user.address.addressLine != null) {
        this.addressLine = user.address.addressLine;
      } else {
        this.addressLine = '';
      }
      if (user.address.city != null) {
        this.city = user.address.city;
      } else {
        this.city = '';
      }
      if (user.address.code != null) {
        this.postalCode = user.address.code;
      } else {
        this.postalCode = '';
      }
      this.stateSelected = this.getIdOfStateFromString(user.address.state);
      this.countrySelected = this.getIdOfCountryFromString(
        user.address.country
      );
    } else {
      this.addressLine = '';
      this.city = '';
      this.postalCode = '';
    }
  }

  getIdOfStateFromString(state: string | null): number {
    for (let index = 0; index < this.states.length; index++) {
      if (this.states[index].label === state) {
        return this.states[index].id;
      }
    }
    return 0;
  }

  getIdOfCountryFromString(country: string): number {
    for (let index = 0; index < this.countries.length; index++) {
      if (this.countries[index].label === country) {
        return this.countries[index].id;
      }
    }
    return 0;
  }

  preapreUserBusinessList(businessList: HTMLElement) {
    this.createTableTopDiv('Nazwa', businessList);
    this.createTableTopDiv('Status', businessList);
    this.createTableTopDiv('Akcja', businessList);
  }

  createTableTopDiv(name: string, businessList: HTMLElement) {
    const div = document.createElement('div');
    div.classList.add('grid-border', 'center-text');
    const span = document.createElement('span');
    span.insertAdjacentText('afterbegin', name);
    div.appendChild(span);
    businessList.appendChild(div);
  }

  checkUserBusinesses() {
    this.userService.getUserBusiness().subscribe(
      (response) => {
        if (response.body == null) {
          return;
        }
        this.businessList = true;
        this.createBusinessStart = false;
        
        for (let index = 0; index < response.body.length; index++) {
          let userBusiness = response.body[index];
          userBusiness.noId = index+1;
          userBusiness.isPanelDisable = true;
          if (userBusiness.companyBranchStatus === 'NOT_ACTIVE') {
            userBusiness.statusClass = 'badge-warning';
            userBusiness.companyBranchStatus = 'Oczekujący';
          } else if (userBusiness.companyBranchStatus === 'ACTIVE') {
            userBusiness.statusClass = 'badge-success';
            userBusiness.companyBranchStatus = 'Aktywny';
            userBusiness.isPanelDisable = false;
          }else if (userBusiness.companyBranchStatus === 'LOCKED'){
            userBusiness.statusClass = 'badge-danger';
            userBusiness.companyBranchStatus = 'Zablokowany';
          } else if (userBusiness.companyBranchStatus === 'CLOSED'){
            userBusiness.statusClass = 'badge-danger';
            userBusiness.companyBranchStatus = 'Zamknięty';
          } else {
            userBusiness.statusClass = 'badge-danger';
            userBusiness.companyBranchStatus = 'Odrzucony';
          }
          if(userBusiness.position === 'OWNER'){
            userBusiness.position = 'Właściciel'
          }else if(userBusiness.position === 'MODERATOR'){
            userBusiness.position = 'Moderator'
          }else {
            userBusiness.position = 'Pracownik'
          }
          
        }  
        this.businesses = response.body;
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  }

  accountDetailsValueChanges() {
    if (this.firstName !== this.userAccountDetails.value.firstName) {
      this.updateAccountDetailsButtonVisable = true;
      return;
    }
    if (this.lastName !== this.userAccountDetails.value.lastName) {
      this.updateAccountDetailsButtonVisable = true;
      return;
    }
    if (this.email !== this.userAccountDetails.value.email) {
      this.updateAccountDetailsButtonVisable = true;
      return;
    }
    if (this.phone !== this.userAccountDetails.value.phone) {
      this.updateAccountDetailsButtonVisable = true;
      return;
    }
    if (this.birthDate !== this.birthDateControl.value) {
      this.updateAccountDetailsButtonVisable = true;
      return;
    }
    if (this.gender !== this.genderSelectedString) {
      this.updateAccountDetailsButtonVisable = true;
      return;
    }
    this.updateAccountDetailsButtonVisable = false;
  }

  accountDetailsUpdate() {
    this.emailExist = false;
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
            const token = response.headers.get('Jwt-Token');
            const scId = response.headers.get('scid');
            const scProperites = response.headers.get('sc_properties');
            this.authenticationService.addUserToLocalCache(response.body!);
            this.authenticationService.saveToken(token!);
            this.authenticationService.saveScId(scId!);
            this.authenticationService.saveScProperties(scProperites!);
            this.saveSavedData();
            this.updateAccountDetailsButtonVisable = false;
          },
          (error: HttpErrorResponse) => {
            if (error.error.message === this.responseMessageInvalidDate) {
              this.birthDateIsNotValidMessage = true;
            }
            if (error.error.message === this.responseMessageEmailExist) {
              this.emailExist = true;
            }
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
    this.validUserPhone();
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

  validUserPhone() {
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

  validPhoneLength(phoneNumber: string): boolean {
    if (phoneNumber.length > 6) {
      return true;
    } else {
      return false;
    }
  }

  validBusinessPhoneFirst(phoneInput: HTMLInputElement) {
    if (phoneInput.value.length > 6) {
      if (this.validPhone(phoneInput.value)) {
        this.phoneFirstIsNotValidMessage = false;
      } else {
        this.phoneFirstIsNotValidMessage = true;
      }
    } else {
      this.phoneFirstIsNotValidMessage = true;
    }
  }

  validCompanyBranchPhone(phoneInput: HTMLInputElement) {
    if (phoneInput.value.length > 6) {
      if (this.validPhone(phoneInput.value)) {
        this.phoneCompanyBranchIsNotValidMessage = false;
      } else {
        this.phoneCompanyBranchIsNotValidMessage = true;
      }
    } else {
      this.phoneCompanyBranchIsNotValidMessage = true;
    }
  }

  validPhone(phone: string) {
    phone = phone.replace(/ /g, '');
    phone = phone.replace(/-/g, '');
    let isValid = /^[0-9]+$/.test(phone);
    if (!isValid) {
      return false;
    } else {
      return true;
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

  accounAddressUpdate(state: HTMLSelectElement, country: HTMLSelectElement) {
    if (this.checkAddress()) {
      this.userService
        .saveAddress(
          this.userAddress.value.addressLine,
          this.userAddress.value.city,
          this.userAddress.value.postalCode,
          this.states[state.options.selectedIndex].label,
          this.countries[country.options.selectedIndex].label
        )
        .subscribe(
          (response) => {
            this.notificationService.notify(
              NotificationType.SUCCESS,
              'Adres został zaktualizowany'
            );
            this.authenticationService.addUserToLocalCache(response.body!);
            this.saveSavedData();
            this.updateAddressButtonVisable = false;
          },
          (error: HttpErrorResponse) => {
            this.notificationService.notify(
              NotificationType.ERROR,
              error.error.message
            );
          }
        );
    }
  }

  checkAddress(): boolean {
    const code = this.userAddress.value.postalCode;
    if (code.length == 0) {
      this.postalCodeNotValidMessage = false;
      return true;
    }
    if (this.checkPostalCode(code)) {
      this.postalCodeNotValidMessage = false;
      return true;
    } else {
      this.postalCodeNotValidMessage = true;
      return false;
    }
  }

  checkAddressValueChanges(
    state: HTMLSelectElement,
    country: HTMLSelectElement
  ) {
    if (
      this.addressLine.toLowerCase() !==
      this.userAddress.value.addressLine.toLowerCase()
    ) {
      this.updateAddressButtonVisable = true;
      return;
    }
    if (this.city.toLowerCase() !== this.userAddress.value.city.toLowerCase()) {
      this.updateAddressButtonVisable = true;
      return;
    }
    if (this.postalCode !== this.userAddress.value.postalCode) {
      this.updateAddressButtonVisable = true;
      return;
    }
    if (this.stateSelected !== state.options.selectedIndex) {
      this.updateAddressButtonVisable = true;
      return;
    }
    if (this.countrySelected !== country.options.selectedIndex) {
      this.updateAddressButtonVisable = true;
      return;
    }

    this.updateAddressButtonVisable = false;
  }

  selectStateNewValue(state: HTMLSelectElement) {
    // this.stateNewSelected = state.options.selectedIndex;
    // this.checkAddressValueChanges();
  }

  selectCountryNewValue(country: HTMLSelectElement) {
    // if(this.countryNewSelected != country.options.selectedIndex){
    //   this.countryNewSelected = country.options.selectedIndex;
    // }
    // this.checkAddressValueChanges();
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
    this.genderSelectedString = 'MALE';
    this.accountDetailsValueChanges();
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
    this.genderSelectedString = 'FEMALE';
    this.accountDetailsValueChanges();
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
    this.genderSelectedString = 'UNDEFINED';
    this.accountDetailsValueChanges();
  }

  ///
  // Create Bussiness for user
  ///

  addBusiness(){
      this.businessList = false;
      this.createBusinessNip = true;
  }

  businessStepOne() {
    if (this.checkUserBeforeCreateBusienss()) {
      this.createBusinessSummary = false;
      this.createBusinessStart = false;
      this.createBusinessNip = true;
    }
  }

  businessStepTwo(inputNIP: HTMLInputElement) {
    let nipNumber: string = inputNIP.value;
    nipNumber = nipNumber.replace(/-/g, '');
    nipNumber = nipNumber.replace(/ /g, '');
    if (this.checkNip(inputNIP) === 10) {
      this.nipIsNotValidMessage = false;
      this.createBusinessNip = false;
      this.createBusinessDetails = true;
      this.busienssDataNIP = nipNumber;
    } else {
      this.nipIsNotValidMessage = true;
    }
  }

  businessStepThree(state: HTMLSelectElement, country: HTMLSelectElement) {
    if (this.checkBusinessAddress(state, country)) {
      this.createBusinessDetails = false;
      this.createBusinessPhones = true;
      this.busienssDataStateId = state.options.selectedIndex;
      this.busienssDataCountryId = country.options.selectedIndex;
    }
  }

  businessStepFour(
    phoneFirstInput: HTMLInputElement
  ) {
    if (phoneFirstInput.value.length === 0) {
      this.phoneFirstIsRequiredMessage = true;
    } else {
      this.phoneFirstIsRequiredMessage = false;
    }

    this.validBusinessPhoneFirst(phoneFirstInput);

    if (
      !this.phoneFirstIsNotValidMessage &&
      !this.phoneFirstIsRequiredMessage
    ) {
      this.busienssDataPhoneFirst = phoneFirstInput.value;
      this.createBusinessPhones = false;
      this.createBusinessDescription = true;
    }
  }

  businessStepFive(
    displayNameInput: HTMLInputElement,
    descriptionTextarea: HTMLTextAreaElement,
    stateCompanyBranch: HTMLSelectElement,
    conutryCompanyBranch : HTMLSelectElement,
    phoneInput: HTMLInputElement
  ) {
    if(this.createBusinessAddressCompanyBranch){
      if(!this.checkCompanyBranchAddress(stateCompanyBranch,conutryCompanyBranch)){
        return;
      }else{
        this.companyBranchDataStateId = stateCompanyBranch.options.selectedIndex;
        this.companyBranchDataCountryId = conutryCompanyBranch.options.selectedIndex;
      }
    }else{
      this.companyBranchDetails.value.addressLine = this.businessDetails.value.addressLine;
      this.companyBranchDetails.value.postalCode = this.businessDetails.value.postalCode;
      this.companyBranchDetails.value.city = this.businessDetails.value.city;
      this.companyBranchDataStateId = this.busienssDataStateId;
      this.companyBranchDataCountryId = this.busienssDataCountryId;
    }
    if(this.createBusinessPhoneCompanyBranch){
      if (phoneInput.value.length === 0) {
        this.phoneCompanyBranchIsRequiredMessage = true;
      } else {
        this.phoneCompanyBranchIsRequiredMessage = false;
      }
      this.validCompanyBranchPhone(phoneInput);
      if (
        this.phoneCompanyBranchIsNotValidMessage &&
        this.phoneCompanyBranchIsRequiredMessage
      ){
        return;
      }else {
        this.companyBranchDataPhone = phoneInput.value;
      }
    }else {
      this.companyBranchDataPhone = this.busienssDataPhoneFirst;
    }

    this.createBusinessDescription = false;
    this.createBusinessSummary = true;
    if (displayNameInput.value.length != 0) {
      this.companyBranchName = displayNameInput.value;
    } else {
      this.companyBranchName = this.businessDetails.value.name;
    }
    if (descriptionTextarea.value.length != 0) {
      this.companyBranchDataDescription = descriptionTextarea.value;
    } else {
      this.companyBranchDataDescription = '-';
    }
  }

  checkUserBeforeCreateBusienss(): boolean {
    const user = this.authenticationService.getUserFromLocalCahce();
    if (user.firstName != null && user.lastName != null && user.email != null) {
      if (user.birthDate == null) {
        this.emptyUserDetailsMessage = true;
        this.emptyBirthDateMessage = true;
      } else {
        this.emptyBirthDateMessage = false;
      }
      if (user.phone == null) {
        this.emptyUserDetailsMessage = true;
        this.emptyPhoneNumberMessage = true;
      } else {
        this.emptyPhoneNumberMessage = false;
      }
      if (user.address == null) {
        this.emptyUserDetailsMessage = true;
        this.emptyAddressStreeMessage = true;
        this.emptyAddressCityMessage = true;
        this.emptyAddressPostalCodeMessage = true;
        this.emptyAddressCountryMessage = true;
        this.emptyAddressStateMessage = true;
        return false;
      } else {
        if (user.address.addressLine == null) {
          this.emptyUserDetailsMessage = true;
          this.emptyAddressStreeMessage = true;
        } else {
          this.emptyAddressStreeMessage = false;
        }
        if (user.address.city == null) {
          this.emptyUserDetailsMessage = true;
          this.emptyAddressCityMessage = true;
        } else {
          this.emptyAddressCityMessage = false;
        }
        if (user.address.code == null) {
          this.emptyUserDetailsMessage = true;
          this.emptyAddressPostalCodeMessage = true;
        } else {
          this.emptyAddressPostalCodeMessage = false;
        }
        if (user.address.country == null) {
          this.emptyUserDetailsMessage = true;
          this.emptyAddressCountryMessage = true;
        } else {
          this.emptyAddressCountryMessage = false;
        }
        if (user.address.state == null) {
          this.emptyUserDetailsMessage = true;
          this.emptyAddressStateMessage = true;
        } else {
          this.emptyAddressStateMessage = false;
        }
      }
    } else {
      this.emptyUserDetailsMessage = true;
      return false;
    }
    if (this.emptyUserDetailsMessage) {
      return false;
    } else {
      return true;
    }
  }

  checkNip(nipInput: HTMLInputElement): number {
    let nipNumber: string = nipInput.value;
    nipNumber = nipNumber.replace(/-/g, '');
    nipNumber = nipNumber.replace(/ /g, '');
    let isValid = /^[0-9]+$/.test(nipNumber);
    if (!isValid) {
      this.nipIsNotValidMessage = true;
    } else {
      this.nipIsNotValidMessage = false;
    }
    return nipNumber.length;
  }

  checkBusinessAddress(
    state: HTMLSelectElement,
    country: HTMLSelectElement
  ): boolean {
    if (this.businessDetails.value.name.length == 0) {
      this.businessNameIsRequiredMessage = true;
    } else {
      this.businessNameIsRequiredMessage = false;
    }
    if (this.businessDetails.value.addressLine.length == 0) {
      this.businessStreetIsRequiredMessage = true;
    } else {
      this.businessStreetIsRequiredMessage = false;
    }
    if (this.businessDetails.value.city.length == 0) {
      this.businessCityIsRequiredMessage = true;
    } else {
      this.businessCityIsRequiredMessage = false;
    }
    if (this.businessDetails.value.postalCode.length == 0) {
      this.businessPostalCodeIsRequiredMessage = true;
    } else {
      this.businessPostalCodeIsRequiredMessage = false;
      //is valid?
      if (this.checkPostalCode(this.businessDetails.value.postalCode)) {
        this.businessPostalCodeIsNotValidMessage = false;
      } else {
        this.businessPostalCodeIsNotValidMessage = true;
      }
    }
    if (state.options.selectedIndex == 0) {
      this.businessStateIsRequiredMessage = true;
    } else {
      this.businessStateIsRequiredMessage = false;
    }
    if (country.options.selectedIndex == 0) {
      this.businessCountryIsRequiredMessage = true;
    } else {
      this.businessCountryIsRequiredMessage = false;
    }

    if (
      this.businessNameIsRequiredMessage ||
      this.businessStreetIsRequiredMessage ||
      this.businessCityIsRequiredMessage ||
      this.businessPostalCodeIsRequiredMessage ||
      this.businessPostalCodeIsNotValidMessage ||
      this.businessStateIsRequiredMessage ||
      this.businessCountryIsRequiredMessage
    ) {
      return false;
    } else {
      return true;
    }
  }

  checkCompanyBranchAddress(
    state: HTMLSelectElement,
    country: HTMLSelectElement
  ): boolean {
    if (this.companyBranchDetails.value.addressLine.length == 0) {
      this.companyBranchStreetIsRequiredMessage = true;
    } else {
      this.companyBranchStreetIsRequiredMessage = false;
    }
    if (this.companyBranchDetails.value.city.length == 0) {
      this.companyBranchCityIsRequiredMessage = true;
    } else {
      this.companyBranchCityIsRequiredMessage = false;
    }
    if (this.companyBranchDetails.value.postalCode.length == 0) {
      this.companyBranchPostalCodeIsRequiredMessage = true;
    } else {
      this.companyBranchPostalCodeIsRequiredMessage = false;
      //is valid?
      if (this.checkPostalCode(this.companyBranchDetails.value.postalCode)) {
        this.companyBranchPostalCodeIsNotValidMessage = false;
      } else {
        this.companyBranchPostalCodeIsNotValidMessage = true;
      }
    }
    if (state.options.selectedIndex == 0) {
      this.companyBranchStateIsRequiredMessage = true;
    } else {
      this.companyBranchStateIsRequiredMessage = false;
    }
    if (country.options.selectedIndex == 0) {
      this.companyBranchCountryIsRequiredMessage = true;
    } else {
      this.companyBranchCountryIsRequiredMessage = false;
    }

    if (
      this.companyBranchStreetIsRequiredMessage ||
      this.companyBranchCityIsRequiredMessage ||
      this.companyBranchPostalCodeIsRequiredMessage ||
      this.companyBranchPostalCodeIsNotValidMessage ||
      this.companyBranchStateIsRequiredMessage ||
      this.companyBranchCountryIsRequiredMessage
    ) {
      return false;
    } else {
      return true;
    }
  }

  private checkPostalCode(code: string): boolean {
    if (code.length == 6) {
      const char = code.indexOf('-');
      if (char == 2) {
        const codeNumber = code.replace('-', '');
        let isValid = /^[0-9]+$/.test(codeNumber);
        if (isValid) {
          return true;
        }
      }
    }
    return false;
  }

  createBusiness() {
    this.userService
      .createBusiness(
        this.busienssDataNIP,
        this.businessDetails.value.name,
        this.businessDetails.value.addressLine,
        this.businessDetails.value.city,
        this.businessDetails.value.postalCode,
        this.states[this.busienssDataStateId].label,
        this.countries[this.busienssDataCountryId].label,
        this.companyBranchDetails.value.addressLine,
        this.companyBranchDetails.value.city,
        this.companyBranchDetails.value.postalCode,
        this.states[this.companyBranchDataStateId].label,
        this.countries[this.companyBranchDataCountryId].label,
        this.companyBranchName,
        this.companyBranchDataDescription,
        this.busienssDataPhoneFirst,
        this.companyBranchDataPhone
      )
      .subscribe(
        (response) => {
          this.createBusinessSummary = false;
          this.createBusinessEnd = true;
        },
        (error: HttpErrorResponse) => {
          this.notificationService.notify(
            NotificationType.ERROR,
            'Rejestracja niepowiodła się! Spróbuj ponownie. Jeżeli błąd powatrza się skontaktuj się z administaracją'
          );
        }
      );
  }

  companyBranchAddressVisable(htmlInput : HTMLInputElement){
    if(htmlInput.value === 'false'){
      this.createBusinessAddressCompanyBranch = false;
    }else {
      this.companyBranchDetails.setValue({
        addressLine : '',
        city : '',
        postalCode : ''
      })
      this.createBusinessAddressCompanyBranch = true;
    }
  }

  companyBranchPhoneVisable(htmlInput : HTMLInputElement){
    if(htmlInput.value === 'false'){
      this.createBusinessPhoneCompanyBranch = false;
    }else {
      this.createBusinessPhoneCompanyBranch = true;
    }
  }


}
