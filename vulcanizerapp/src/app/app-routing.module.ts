import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmComponent } from './confirm/confirm.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { MainComponent } from './main/main.component';
import { UserManagmentComponent } from './user-managment/user-managment.component';
import { AdminManagmentComponent } from './admin-managment/admin-managment.component';
import { WaitingComponent } from './admin-managment/business/waiting/waiting.component';

const routes: Routes = [
  { path: '', component: MainComponent},
  { path: 'users/confirm', component: ConfirmComponent },
  { path: 'user/managment', component: UserManagmentComponent },
  { path: 'admin/managment', component: AdminManagmentComponent },
  { path: 'users/resetpass', component: ResetPasswordComponent },
  { path: '**', redirectTo: '' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
