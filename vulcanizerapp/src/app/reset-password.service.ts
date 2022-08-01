import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomHttpResponse } from './model/custom-http-response';
import { ResetPasswordBody } from './model/reset-request-body';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService {
  apiServerUrl = environment.apiBaseUrl;
  private RESET_LINK = '/users/resetpass';

  constructor(private http: HttpClient) {}

  resetStart(
    email: string,
    firstName: string,
    lastName: string
  ): Observable<HttpResponse<any>> {
    const body: ResetPasswordBody = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      token: '',
      password: '',
    };

    return this.http.post<ResetPasswordBody>(
      `${this.apiServerUrl}${this.RESET_LINK}`,
      body,
      {
        observe: 'response',
      }
    );
  }

  resetSave(token: string, password: string): Observable<HttpResponse<any>> {
    const body: ResetPasswordBody = {
      email: '',
      firstName: '',
      lastName: '',
      token: token,
      password: password,
    };

    const options = { body };

    return this.http.put(`${this.apiServerUrl}${this.RESET_LINK}`, body, {
      observe: 'response',
    });
  }
}
