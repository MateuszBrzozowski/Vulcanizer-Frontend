import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { zipAll } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NotificationType } from '../enum/notification-type.enum';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css'],
})
export class ConfirmComponent implements OnInit {
  private CONFIRM_LINK = '/users/confirm';
  private TOKEN_PARAM = '?token=';
  apiServerUrl = environment.apiBaseUrl;
  url: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private notificationService: NotificationService,
    private activerouter : ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.url = this.router.url;
    this.confirmAccount();
  }

  private confirmAccount() {
    console.log(`${this.apiServerUrl}${this.url}`);

    let token = this.url.substring(this.CONFIRM_LINK.length);
    token = token.substring(this.TOKEN_PARAM.length);

    this.http
      .get(`${this.apiServerUrl}/users/confirm`, { params: { token: token } })
      .subscribe(
        (respone) => {
          this.notificationService.notify(
            NotificationType.SUCCESS,
            'Twoje konto zostało aktywowane. Możesz się teraz zalogować.'
          )
        },
        (error: HttpErrorResponse) => {
            this.notificationService.notify(
              NotificationType.ERROR,
              'Link do aktywacji konta wygasł.'
            )
          
        }
      );
      this.router.navigateByUrl('');      
  }
}
