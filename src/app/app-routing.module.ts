import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotYourPasswordComponent } from './forgot-your-password/forgot-your-password.component';
import { NotRegisteredSignInComponent } from './not-registered-sign-in/not-registered-sign-in.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { WhoAreWeComponent } from './who-are-we/who-are-we.component';

export const routes: Routes = [
  { path: '', component:HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component:HomeComponent },
  { path: 'forgot-your-password', component: ForgotYourPasswordComponent },
  { path: 'not-registered-sign-in', component: NotRegisteredSignInComponent },
  { path: 'login', component: LoginComponent },
  { path: 'who-are-we', component: WhoAreWeComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
