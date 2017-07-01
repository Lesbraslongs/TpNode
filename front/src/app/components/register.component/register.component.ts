/**
 * Created by Children on 29/06/2017.
 */
import {Component} from "@angular/core";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {User} from "../../model/User";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
    selector: 'register.component',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent {

    login = new FormControl("", Validators.required);
    password = new FormControl("", Validators.required);
    password2 = new FormControl("", Validators.required);

    registerForm : FormGroup;

    constructor(
        fb: FormBuilder,
        private userService: UserService,
        private router: Router,
        private _flashMessagesService: FlashMessagesService
    ) {
        if(localStorage.getItem('jwt')){
            this.router.navigate(["/display"]);
        }

        this.registerForm = fb.group({
            'login' : this.login,
            'password': this.password,
            'password2': this.password2,
        },  {validator: this.matchingPasswords('password', 'password2')})
    }

    matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
        return (group: FormGroup) => {
            let passwordInput = group.controls[passwordKey];
            let passwordConfirmationInput = group.controls[passwordConfirmationKey];
            if (passwordInput.value !== passwordConfirmationInput.value) {
                return passwordConfirmationInput.setErrors({notEquivalent: true})
            }
        }
    }

    registerUser(value: any) {

        let user = new User();
        user.login = value.login;
        user.password = value.password;

        this.userService.registerUser(user)
            .then( response => {
                this._flashMessagesService.show(response.message, { cssClass: 'alert-success', timeout: 3000 });
                this.router.navigate(["/login"]);
            })
            .catch( error => {
                console.log(error);
                this.registerForm.reset();
            });
    }

}