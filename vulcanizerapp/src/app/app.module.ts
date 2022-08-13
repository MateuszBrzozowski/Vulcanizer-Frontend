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
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';

import {
  MatRadioModule,
  MAT_RADIO_DEFAULT_OPTIONS,
} from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialModule } from 'src/material.module';
import { MatInputModule } from '@angular/material/input';
import { PanelsComponent } from './user-managment/panels/panels.component';
import { BusinessManagmentComponent } from './business-managment/business-managment.component';
import { BranchManagmentComponent } from './business-managment/branch-managment/branch-managment.component';

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
    PanelsComponent,
    BusinessManagmentComponent,
    BranchManagmentComponent
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
    MatIconModule,
    MatNativeDateModule,
    MatInputModule ,
    // MaterialModule
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
  {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}},
    AuthenticationGuard,
    NotFoundComponent,
    ConfirmComponent,
    ResetPasswordComponent,
    UserManagmentComponent,
    LoginComponent,
    State,
    WaitingComponent,
    PanelsComponent,
    BusinessManagmentComponent,
    BranchManagmentComponent
  ],
  bootstrap: [AppComponent, LoginComponent],
})
export class AppModule {}
