/**
 * Created by Children on 29/06/2017.
 */
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Http} from '@angular/http';

@Component({
    selector: 'register.component',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

    constructor(
        private http: Http
    ) {
    }

    ngOnInit(): void {
    }

    checkIfUserExists(form: NgForm ) {

    }
}