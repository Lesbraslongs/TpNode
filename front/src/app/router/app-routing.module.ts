/**
 * Created by Vincent Léné on 21/06/2017.
 */
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DisplayComponent} from '../components/display.component/display.component';
import {RegisterComponent} from '../components/register.component/register.component';
import {LoginComponent} from '../components/login.component/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/display', pathMatch: 'full' },
  { path: 'display',  component: DisplayComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
