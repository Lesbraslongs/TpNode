/**
 * Created by Children on 29/06/2017.
 */
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Http} from '@angular/http';

@Component({
    selector: 'login.component',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    constructor(
        private http: Http
    ) {
    }

    ngOnInit(): void {
    }

    checkIfUserExists(form: NgForm ) {

    }
}
