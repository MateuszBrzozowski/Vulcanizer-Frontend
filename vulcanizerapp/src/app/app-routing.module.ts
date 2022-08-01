import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthenticationGuard } from './guard/authentication.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { ConfirmComponent } from './confirm/confirm.component';

const routes: Routes = [
  //     { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'users/confirm', component: ConfirmComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
