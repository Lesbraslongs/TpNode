/**
 * Created by Children on 29/06/2017.
 */
import {Component} from "@angular/core";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {User} from "../../model/User";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'register.component',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent {

    registerForm : FormGroup;

    constructor(
        fb: FormBuilder,
        private userService: UserService,
        private router: Router
    ) {
        if(localStorage.getItem('jwt')){
            this.router.navigate(["/display"]);
        }

        this.registerForm = fb.group({
            'login' : [null, Validators.required],
            'password': [null, Validators.required],
        })
    }


    registerUser(value: any) {

        let user = new User();
        user.login = value.login;
        user.password = value.password;

        this.userService.registerUser(user)
            .then( response => {
                this.router.navigate(["/login"]);
            })
            .catch( error => {
                console.log(error);
                this.registerForm.reset();
            });
    }

}