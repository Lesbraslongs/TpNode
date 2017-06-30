import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {User} from "../../model/User";
import {UserService} from "../../services/user.service";

@Component({
    selector: 'login.component',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    user = new User(null, '', '');

    constructor(
        private userService: UserService
    ) {}

    ngOnInit(): void {
    }

    checkIfUserExists(form: NgForm ) {
        this.userService.postUser(form.value)
            .then( user => {
                console.log(user);)
                this.user = user;
            })
            .catch()
    }
}
