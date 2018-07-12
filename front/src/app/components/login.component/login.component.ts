import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../model/User';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
    selector: 'login.component',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {

    loginForm: FormGroup;

    constructor(fb: FormBuilder,
                private userService: UserService,
                private router: Router,
                private _flashMessagesService: FlashMessagesService) {
        // TODO clear localstorage is for debug purpose, remove it after
        localStorage.removeItem('jwt');

        if (localStorage.getItem('jwt')) {
            this._flashMessagesService.show('You are already authenticated !', {
                cssClass: 'alert-success',
                timeout: 1500
            });
            this.router.navigate(['/doors']);
        }

        this.loginForm = fb.group({
            'login': [null, Validators.required],
            'password': [null, Validators.required],
        });
    }

    submitForm(value: any) {

        let user = new User();
        user.login = value.login;
        user.password = value.password;

        this.userService.checkIfExists(user)
            .then(
                (res: any) => {
                    // We’ll subscribe to the request and capture the response
                    // If we get an id_token, we’ll know the request is successful so
                    // we’ll store the token in localStorage. We won’t handle the error use case here.

                    if (res.token) {
                        localStorage.setItem('jwt', res.token);
                        localStorage.setItem('username', user.login.toString());
                        this._flashMessagesService.show(`Welcome ${user.login}`, {
                            cssClass: 'alert-success',
                            timeout: 2000
                        });
                        this.router.navigate(['/doors']);
                    } else {
                        this._flashMessagesService.show(res.message, {cssClass: 'alert-warning', timeout: 2000});
                    }
                    this.loginForm.reset();
                }
            )
            .catch(error => {
                this._flashMessagesService.show(error, {cssClass: 'alert-danger', timeout: 2000});
                console.log(error);
                this.loginForm.reset();
            });
    }
}
