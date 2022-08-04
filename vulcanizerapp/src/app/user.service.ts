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
    let params = new FormData();
    params.append('firstName', firstName);
    params.append('lastName', lastName);
    params.append('email', email);
    params.append('phone', phone);
    params.append('gender', gender);
    params.append('birthDate', birthDate);
   return this.http.put<User>(`${this.apiServerUrl}/users/update`,params,{observe : 'response'});

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
