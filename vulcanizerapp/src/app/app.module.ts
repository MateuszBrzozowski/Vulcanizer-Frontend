import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { UserService } from './user.service';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './service/authentication.service';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { AuthenticationGuard } from './guard/authentication.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { NotificationModule } from './notification.module';
import { NotificationService } from './service/notification.service';
import { ConfirmComponent } from './confirm/confirm.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { MainComponent } from './main/main.component';
import { UserManagmentComponent } from './user-managment/user-managment.component';
import { State } from './enum/states.enum';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { AdminManagmentComponent } from './admin-managment/admin-managment.component';
import { WaitingComponent } from './admin-managment/business/waiting/waiting.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatRadioModule,
  MAT_RADIO_DEFAULT_OPTIONS,
} from '@angular/material/radio';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    MainComponent,
    ResetPasswordComponent,
    UserManagmentComponent,
    AdminManagmentComponent,
    WaitingComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    NgbModalModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NotificationModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatMenuModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatRadioModule,
    FormsModule,
  ],
  providers: [
    UserService,
    CookieService,
    AuthenticationService,
    NotificationService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'primary' },
  },
    AuthenticationGuard,
    NotFoundComponent,
    ConfirmComponent,
    ResetPasswordComponent,
    UserManagmentComponent,
    LoginComponent,
    State,
  ],
  bootstrap: [AppComponent, LoginComponent],
})
export class AppModule {}
