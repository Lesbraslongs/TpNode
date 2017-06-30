import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {AppRoutingModule} from '../router/app-routing.module';
import {AppComponent} from '../components/app.component/app.component';
import {LoginComponent} from '../components/login.component/login.component';
import {RegisterComponent} from '../components/register.component/register.component';
import {DisplayComponent} from '../components/display.component/display.component';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserService} from "../services/user.service";
import {EmailService} from "../services/email.service";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule
        ],
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        DisplayComponent],
    bootstrap: [AppComponent],
    providers: [UserService, EmailService, FormBuilder ]
})
export class AppModule {
}
