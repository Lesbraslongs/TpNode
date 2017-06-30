/**
 * Created by Children on 29/06/2017.
 */
import {Component, OnInit} from "@angular/core";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
    selector: 'register.component',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent {

    constructor(
        private userService: UserService,
        private router: Router
    ) {
    }

}