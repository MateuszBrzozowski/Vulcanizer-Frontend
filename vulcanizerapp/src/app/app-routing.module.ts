import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthenticationGuard } from './guard/authentication.guard';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
//     { path: '', redirectTo: '', pathMatch: 'full' },
//   { path: '**', redirectTo: '/404-not-found', pathMatch: 'full' },
//   { path: '404-not-found', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
