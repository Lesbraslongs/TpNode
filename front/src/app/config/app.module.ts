import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent}  from './app.component';
import {LoginComponent} from '../components/login.component/login.component';
import {RegisterComponent} from '../components/register.component/register.component';
import {DisplayComponent} from '../components/display.component/display.component';
import {AppRoutingModule} from '../router/app-routing.module';
import {HttpModule} from '@angular/http';
import {EmailService} from '../services/email.service';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutingModule],
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        DisplayComponent],
    bootstrap: [AppComponent],
    providers: [ EmailService ]
})
export class AppModule {
}
