import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(
    httpRequest: HttpRequest<any>,
    httpHandler: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      httpRequest.url.includes(
        `${this.authenticationService.apiServerUrl}/users/login`
      )
    ) {
      return httpHandler.handle(httpRequest);
    }
    if (
      httpRequest.url.includes(
        `${this.authenticationService.apiServerUrl}/users/register`
      )
    ) {
      return httpHandler.handle(httpRequest);
    }
    if (
      httpRequest.url.includes(
        `${this.authenticationService.apiServerUrl}/api/v1/public-data/business/recommend`
      )
    ) {
      return httpHandler.handle(httpRequest);
    }
    if (
      httpRequest.url.includes(
        `${this.authenticationService.apiServerUrl}/users/confirm`
      )
    ) {
      return httpHandler.handle(httpRequest);
    }
    if (
      httpRequest.url.includes(
        `${this.authenticationService.apiServerUrl}/users/resetpass`
      )
    ) {
      return httpHandler.handle(httpRequest);
    }
    this.authenticationService.loadToken();
    this.authenticationService.loadScId();
    this.authenticationService.loadScProperties();
    const token = this.authenticationService.getToken();
    const scid = this.authenticationService.getScId();
    const scProperites = this.authenticationService.getScProperties();
    const request = httpRequest.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'scid': scid,
        'sc_properties': scProperites,
      },
    });
    return httpHandler.handle(request);
  }
}
