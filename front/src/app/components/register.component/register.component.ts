/**
 * Created by Children on 29/06/2017.
 */
import {Component, OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {User} from "../../model/User";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
    selector: 'register.component',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

    constructor(
        private userService: UserService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
    }

    registerUser(form: NgForm ) {
        if(form.valid) {
            let data = JSON.parse(form.value);

            let user = new User();
            user.login = data.login;
            user.password = data.password;
            this.userService.saveUser(user);

            //redirect to login page TODO do it server side?
            this.router.navigate(['/login']);
        }
    }
}