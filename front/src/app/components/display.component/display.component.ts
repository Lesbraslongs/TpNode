
// angular import
import { Component, OnInit } from '@angular/core';
import { Router            } from "@angular/router";

//business import
import { Email                              } from '../../model/Email';
import { EmailService                       } from '../../services/email.service';
import { FlashMessagesService               } from 'angular2-flash-messages';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Angular2Csv                        } from 'angular2-csv/Angular2-csv';

@Component({
    selector: 'display.component',
    templateUrl: './display.component.html',
    styleUrls: ['./display.component.css']
})

export class DisplayComponent implements OnInit {

    model: Email;

    addEmailForm: FormGroup;

    emailInfo: any[] = [];

    emails: string[] = [];

    constructor(
        fb: FormBuilder,
        private _flashMessagesService: FlashMessagesService,
        private emailService: EmailService,
        private router: Router,
    ) {
        this.addEmailForm = fb.group({
            'firstname': [null, Validators.required],
            'name': [null, Validators.required],
            'domain': [null, Validators.required],
        })
    }

    ngOnInit(): void {
        //TODO checker le token en bdd
        if (localStorage.getItem('jwt')) {
            this.emailService.findAll()
                .then(
                (res: any) => {
                    this.buildEmailsInfo(res.emails);
                }
                );
        } else {
            this._flashMessagesService.show(`You are not authorized to view this page !`, { cssClass: 'alert-danger', timeout: 2000 });
            this.router.navigate(['/login']);
        }
    }

    buildEmailsInfo(emailsInfoList: any) {
        for (let info of emailsInfoList) {
            this.emailInfo.push({
                firstname: info.firstname,
                name: info.name,
                domain: info.domain,
                emails: [
                    info.firstname + info.name + '@' + info.domain,
                    info.name + info.firstname + '@' + info.domain,
                    info.firstname + '.' + info.name + '@' + info.domain,
                    info.name + '.' + info.firstname + '@' + info.domain,
                    info.firstname + '-' + info.name + '@' + info.domain,
                    info.name + '-' + info.firstname + '@' + info.domain,
                    info.firstname + '_' + info.name + '@' + info.domain,
                    info.name + '_' + info.name + '@' + info.domain
                ]
            })
        }
    }

    addEmail(addEmailForm: any) {
        this.model = addEmailForm.value;
        let email = new Email();
        email.firstname = this.model.firstname;
        email.name = this.model.name;
        email.domain = this.model.domain;

        this.emailService.checkIfExists(email)
            .then(
            (res: any) => {
                console.log(res);
                if (res.success === true) {
                    this._flashMessagesService.show(`Email information added with success !`, { cssClass: 'alert-success', timeout: 2000 });
                    // TODO : Essayer de trouver une meilleur solution.
                    window.location.reload();
                }
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

    exportToCsv() {
        //TODO checker le token en bdd
        if (localStorage.getItem('jwt')) {
            this.emailService.findAll()
                .then(
                (res: any) => {
                    let listEmails = []
                    for (let info of this.emailInfo) {
                        console.log(info.emails);
                        listEmails.push(info.emails);
                    }

                    let options = {
                        fieldSeparator: ',',
                        quoteStrings: '"',
                        decimalseparator: '.',
                        showLabels: false,
                        showTitle: false,
                        useBom: true
                    };
                    new Angular2Csv(listEmails, 'email_list', options);
                }
                );
        }
    }

}
