/**
 * Created by Children on 29/06/2017.
 */
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Http} from '@angular/http';
import {Router} from "@angular/router";

import { Email } from '../../model/Email';
import { EmailService } from '../../services/email.service';

@Component({
    selector: 'display.component',
    templateUrl: './display.component.html',
    styleUrls: ['./display.component.css']
})

export class DisplayComponent  implements OnInit{

    model : Email;
    
    emails : string[];

    constructor(
        private http: Http,
        private emailService: EmailService,
        private router: Router
    ) {
        this.model = new Email(1, "lavallee", "arnaud", "gmail.com");
    }

    ngOnInit(): void {
        //TODO checker le token en bdd
        if(localStorage.getItem('jwt')){
            let emails = this.emailService.findAll();
            for (let email of emails) {
                this.buildEmail(email.firstname, email.name, email.domain);
            }
        }else{
            this.router.navigate(['/login']);
        }

    }

    addEmail(addEmailForm: NgForm) {
        this.model = addEmailForm.form.value;
        console.log(this.model);
        this.emailService.create(this.model.firstname, this.model.name, this.model.domain);        
    }
    
    buildEmail(firstname: string, name: string, domain: string) {
        this.emails.push(firstname + name + '@' + domain);
        this.emails.push(name + firstname + '@' + domain);
        this.emails.push(firstname + '.' + name + '@' + domain);
        this.emails.push(name + '.' + firstname + '@' + domain);
        this.emails.push(firstname + '-' + name + '@' + domain);
        this.emails.push(name + '-' + firstname + '@' + domain);
        this.emails.push(firstname + '_' + name + '@' + domain);
        this.emails.push(name + '_' + name + '@' + domain);
    }
}
