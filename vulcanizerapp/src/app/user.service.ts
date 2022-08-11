import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './users';
import { NotificationService } from './service/notification.service';
import { NotificationType } from './enum/notification-type.enum';
import { AuthenticationService } from './service/authentication.service';
import { Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { Business, UserCompany, UserCompanyBranch } from './business';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  /**
   * getUsers
   */
  public getUsers(): Observable<User[] | HttpErrorResponse> {
    return this.http.get<User[]>(`${this.apiServerUrl}/users`);
  }

  public addUsersToLocalCache(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  /**
   * saveNewPassword
   */
  public saveNewPassword(newPassword: string): Observable<HttpResponse<User>> {
    let params = new FormData();
    params.append('pass', newPassword);
    return this.http.put<User>(`${this.apiServerUrl}/users/newpass`, params, {
      observe: 'response',
    });
  }

  /**
   * updateAccountDetails
   */
  public updateAccountDetails(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    gender: string,
    birthDate: string
  ): Observable<HttpResponse<User>> {
    const body = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      gender: gender,
      birthDate: birthDate,
    };
    return this.http.put<User>(`${this.apiServerUrl}/users/update`, body, {
      observe: 'response',
    });
  }

  /**
   * saveAddress
   */
  public saveAddress(
    addressLine: string,
    city: string,
    code: string,
    state: string,
    country: string
  ): Observable<HttpResponse<User>> {
    const body = {
      addressLine: addressLine,
      city: city,
      code: code,
      state: state,
      country: country,
    };
    return this.http.put<User>(`${this.apiServerUrl}/users/address`, body, {
      observe: 'response',
    });
  }

  // : Observable<HttpResponse<Business>>
  /**
   * createBusiness
   */
  public createBusiness(
    nip: string,
    name: string,
    addressLine: string,
    city: string,
    code: string,
    state: string,
    country: string,
    addressLineCB: string,
    cityCB: string,
    codeCB: string,
    stateCB: string,
    countryCB: string,
    nameCB: string,
    descriptionCB: string,
    phone: string,
    phoneCB: string,
    companyId : string
  ): Observable<HttpResponse<any>> {
    const address = {
      addressLine: addressLine,
      city: city,
      code: code,
      state: state,
      country: country,
    };
    const addressCB = {
      addressLine: addressLineCB,
      city: cityCB,
      code: codeCB,
      state: stateCB,
      country: countryCB,
    };
    const body = {
      name: name,
      nip: nip,
      address: address,
      phone: phone,
      nameCB: nameCB,
      descriptionCB: descriptionCB,
      addressCB: addressCB,
      phoneCB: phoneCB,
      companyId : companyId
    };
    return this.http.post<HttpResponse<any>>(
      `${this.apiServerUrl}/api/v1/company/create`,
      body,
      { observe: 'response' }
    );
  }

  /**
   * getUserCompany
   */
  public getUserCompany() : Observable<HttpResponse<UserCompany[]>> {
    return this.http.get<UserCompany[]>(`${this.apiServerUrl}/users/company`, {observe : 'response'})
  }

  /**
   * getUserCompanyBranch
   */
  public getUserCompanyBranch(): Observable<HttpResponse<UserCompanyBranch[]>> {
    return this.http.get<UserCompanyBranch[]>(
      `${this.apiServerUrl}/users/company/branch`,
      { observe: 'response' }
    );
  }

  /**
   * getUsersFromLocalCache
   */
  public getUsersFromLocalCache(): User[] {
    if (localStorage.getItem('users')) {
      return JSON.parse(localStorage.getItem('users')!);
    }
    return JSON.parse('[]');
  }
}
