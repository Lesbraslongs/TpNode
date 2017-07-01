import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from "../../model/User";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
    selector: 'login.component',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {

    loginForm : FormGroup;
    authenticated: boolean;

    constructor(
        fb: FormBuilder,
        private userService: UserService,
        private router: Router,
        private _flashMessagesService: FlashMessagesService
    ) {
        if(localStorage.getItem('jwt')){
            this.authenticated = true;
            this._flashMessagesService.show('You are already authenticated !', { cssClass: 'alert-success', timeout: 3000 });
            this.router.navigate(["/display"]);
        }

        this.loginForm = fb.group({
            'login' : [null, Validators.required],
            'password': [null, Validators.required],
        })
    }

    submitForm(value: any){

        let user = new User();
        user.login = value.login;
        user.password = value.password;

        this.userService.checkIfExists(user)
            .then(
                (res:any)=>{
                    console.log(res);
                    // We’ll subscribe to the request and capture the response
                    // If we get an id_token, we’ll know the request is successful so we’ll store the token in localStorage. We won’t handle the error use case for this tutorial.
                    if(res.token){
                        localStorage.setItem('jwt', res.token);
                        this._flashMessagesService.show(`Welcome ${user.login}`, { cssClass: 'alert-success', timeout: 3000 });
                        this.router.navigate(["/display"]);
                    }else{
                        this._flashMessagesService.show(res.message, { cssClass: 'alert-warning', timeout: 3000 });
                    }
                    this.loginForm.reset();
                }
            )
            .catch(error => {
                this._flashMessagesService.show(error, { cssClass: 'alert-danger', timeout: 3000 });
                console.log(error);
                this.loginForm.reset();
            })
    }

    logout(){
        localStorage.removeItem('jwt');
        this.authenticated = false;
    }
}
