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

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
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
  public saveNewPassword(newPassword: string) {
    let params = new FormData();
    params.append('pass', newPassword);
    this.http.put(`${this.apiServerUrl}/users/newpass`, params).subscribe(
      (response) => {
        this.notificationService.notify(
          NotificationType.SUCCESS,
          'Hasło zostało zmienione'
        );
      },
      (error: HttpErrorResponse) => {
        this.notificationService.notify(
          NotificationType.ERROR,
          'Coś poszło nie tak! Sprbuj ponownie później'
        );
      }
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
