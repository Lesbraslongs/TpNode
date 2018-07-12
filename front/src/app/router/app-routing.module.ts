import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from '../components/register.component/register.component';
import {DisplayComponent} from '../components/display.component/display.component';
import {LoginComponent} from '../components/login.component/login.component';
import {DoorComponent} from '../components/door.component/door.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'display',  component: DisplayComponent },
  { path: 'doors', component: DoorComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
