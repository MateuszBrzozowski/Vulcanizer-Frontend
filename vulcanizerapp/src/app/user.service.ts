import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { catchError, observable, Observable } from 'rxjs';
import { User } from './users';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/users`);
  }

  /**
   * registerNewUser
   */
  public registerNewUser(emailForm: User): Observable<unknown> {
    // const registerBody = JSON.stringify({
    //   firstName: emailForm.firstName,
    //   lastName: emailForm.lastName,
    //   email: emailForm.email,
    //   password: emailForm.password
    // });
    return this.http.post<User>(
      `${this.apiServerUrl}/api/v1/users`,
      emailForm,
      { observe: 'response' }
    );
  }

  /**
   * userLogin
   */
  public userLogin(loginForm: User): Observable<User> {
    
    return this.http.post<User>(`${this.apiServerUrl}/api/v1/users/login`,loginForm);
  }
}
