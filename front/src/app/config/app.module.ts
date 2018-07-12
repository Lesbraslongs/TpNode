import {NgModule, LOCALE_ID}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';
import {AppRoutingModule} from '../router/app-routing.module';
import {AppComponent} from '../components/app.component/app.component';
import {LoginComponent} from '../components/login.component/login.component';
import {RegisterComponent} from '../components/register.component/register.component';
import {DisplayComponent} from '../components/display.component/display.component';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserService} from '../services/user.service';
import {EmailService} from '../services/email.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { DoorComponent } from '../components/door.component/door.component';
import { DoorService } from '../services/door.service';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        HttpModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        FlashMessagesModule,
        ],
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        DisplayComponent,
        DoorComponent],
    bootstrap: [AppComponent],
    providers: [UserService, EmailService, FormBuilder, DoorService, {provide: LOCALE_ID, useValue: 'fr-FR'}, ]
})
export class AppModule {
}
