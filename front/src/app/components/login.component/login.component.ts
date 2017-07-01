import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from "../../model/User";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

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
        private router: Router
    ) {
        if(localStorage.getItem('jwt')){
            this.authenticated = true;
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
                        this.router.navigate(["/display"]);
                    }else{
                        console.log(res.message);
                    }
                    this.loginForm.reset();
                }
            )
            .catch(error => {
                console.log(error);
                this.loginForm.reset();
            })
    }

    logout(){
        localStorage.removeItem('jwt');
        this.authenticated = false;
    }
}
