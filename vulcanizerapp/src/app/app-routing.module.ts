import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthenticationGuard } from './guard/authentication.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { MainComponent } from './main/main.component';
import { UserManagmentComponent } from './user-managment/user-managment.component';

const routes: Routes = [
  { path: '', component: MainComponent},
  { path: 'users/confirm', component: ConfirmComponent },
  { path: 'user/managment', component: UserManagmentComponent },
  { path: 'users/resetpass', component: ResetPasswordComponent },
  { path: '**', redirectTo: '' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
