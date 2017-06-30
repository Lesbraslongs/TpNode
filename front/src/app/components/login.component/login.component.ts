import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from "../../model/User";
import {Router} from "@angular/router";
import {UserFactory} from "../../services/user.factory";

@Component({
    selector: 'login.component',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {

    private url = "http://localhost:3000/api/v1/login";
    // We are going to declare our variables here. We’ll have a loginForm that will represent our reactive form, an authenticated boolean that will be true or false based on the users auth status and finally a profile object that will hold the user data.
    loginForm : FormGroup;
    authenticated: boolean;

    constructor(
        fb: FormBuilder,
        private userFactory: UserFactory,
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

        this.userFactory.checkIfExists(user).subscribe(
            (res:any)=>{
                // We’ll subscribe to the request and capture the response
                let data = res.json();
                // If we get an id_token, we’ll know the request is successful so we’ll store the token in localStorage. We won’t handle the error use case for this tutorial.
                //TODO define the name of the token
                if(data.id_token){
                    localStorage.setItem('jwt', data.id_token);
                }
                this.loginForm.reset();
            }
        )
    }

    logout(){
        localStorage.removeItem('jwt');
        this.authenticated = false;
    }
}
