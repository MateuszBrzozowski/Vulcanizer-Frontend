import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NotificationType } from '../enum/notification-type.enum';
import { ResetPasswordService } from '../reset-password.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  private RESET_LINK = '/users/resetpass';
  private TOKEN_PARAM = '?id=';
  apiServerUrl = environment.apiBaseUrl;
  url: string = '';
  token: string = '';
  passNotSame: boolean = false;

  userResetPasswrod: FormGroup = new FormGroup({
    password: new FormControl('', Validators.required),
    passwordRepeat: new FormControl('', Validators.required),
  });

  constructor(
    private router: Router,
    private http: HttpClient,
    private notificationService: NotificationService,
    private activerouter: ActivatedRoute,
    private resetPassService: ResetPasswordService
  ) {}

  ngOnInit(): void {
    this.url = this.router.url;
    console.log(this.url);
    if (!this.chekUrl()) {
      //odkomentowac po testach
      // this.router.navigateByUrl('');
    }
  }

  private chekUrl(): boolean {
    let token = this.url.substring(this.RESET_LINK.length);
    token = token.substring(this.TOKEN_PARAM.length);

    if (token.length >= 150 && token.length <= 160) {
      this.token = token;
      return true;
    }
    return false;
  }

  isPassValid(): boolean {
    return this.userResetPasswrod.valid;
  }

  reset(): void {
    this.checkPassIsSame();
    if (this.token === '') {
      this.notificationService.notify(
        NotificationType.ERROR,
        'Zmiana hasła niepowiodła się. Spróbuj ponownie lub skontaktuj się z administratorem'
      );
      this.router.navigateByUrl('');
      return;
    }
    if (!this.passNotSame) {
      console.log(this.token);
      console.log(this.userResetPasswrod.value.password);
      console.log(this.userResetPasswrod.value.passwordRepeat);
      //mam token, pass wywolac metode get na BE z zapisanem nowego hasla
      this.resetPassService
        .resetSave(this.token, this.userResetPasswrod.value.password)
        .subscribe(
          (response) => {
            if (response.status === 200) {
              this.router.navigateByUrl('');
              this.notificationService.notify(
                NotificationType.SUCCESS,
                'Hasło zostało zaktualizowane'
              );
            }
          },
          (error: HttpErrorResponse) => {
            this.router.navigateByUrl('');
            this.notificationService.notify(
              NotificationType.ERROR,
              'Zmiana hasła niemożliwa. Spróbuj ponownie później.'
            );
          }
        );
    }
  }

  private checkPassIsSame() {
    if (
      this.userResetPasswrod.value.password !==
      this.userResetPasswrod.value.passwordRepeat
    ) {
      this.passNotSame = true;
    } else {
      this.passNotSame = false;
    }
  }
}
