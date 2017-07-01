/**
 * Created by Children on 29/06/2017.
 */
import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {Email} from '../../model/Email';
import {EmailService} from '../../services/email.service';

@Component({
    selector: 'display.component',
    templateUrl: './display.component.html',
    styleUrls: ['./display.component.css']
})

export class DisplayComponent implements OnInit {

    model: Email;

    emails: string[] = [];

    constructor(private emailService: EmailService,
                private router: Router) {
    }

    ngOnInit(): void {
        //TODO checker le token en bdd
        if (localStorage.getItem('jwt')) {
            this.emailService.findAll()
                .then(
                    (res: any) => {
                        this.buildEmail(res.emails);
                    }
                );
        } else {
            this.router.navigate(['/login']);
        }
    }

    buildEmail(emailsList: any) {
        for (let email of emailsList) {

            this.emails.push(email.firstname + email.name + '@' + email.domain);
            this.emails.push(email.name + email.firstname + '@' + email.domain);
            this.emails.push(email.firstname + '.' + email.name + '@' + email.domain);
            this.emails.push(email.name + '.' + email.firstname + '@' + email.domain);
            this.emails.push(email.firstname + '-' + email.name + '@' + email.domain);
            this.emails.push(email.name + '-' + email.firstname + '@' + email.domain);
            this.emails.push(email.firstname + '_' + email.name + '@' + email.domain);
            this.emails.push(email.name + '_' + email.name + '@' + email.domain);
        }
    }

    addEmail(value: any) {
        console.log(this.model);
        let email = new Email(value.id, value.firstname, value.name, value.domain);
        this.model = value.form.value;
        this.emailService.checkIfExists(email)
            .then(
                (res: any) => {
                    console.log(res);
                }
            )
            .catch(error => {
                console.log(error);
            })
    }

    logout() {
        localStorage.removeItem('jwt');
        this.router.navigate(["login"]);
    }
}
