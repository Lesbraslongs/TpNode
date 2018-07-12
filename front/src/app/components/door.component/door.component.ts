
// angular import
import { Component, OnInit } from '@angular/core';
import { Router            } from '@angular/router';
import {
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatNativeDateModule,
} from '@angular/material';

// business import
import { FlashMessagesService               } from 'angular2-flash-messages';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Door } from '../../model/Door';
import { DoorService } from '../../services/door.service';

@Component({
    selector: 'door.component',
    templateUrl: './door.component.html',
    styleUrls: ['./door.component.css']
})

export class DoorComponent implements OnInit {
    addDoorForm: FormGroup;
    model: Door;
    doorInfo: any[] = [];

    constructor(
        fb: FormBuilder,
        private _flashMessagesService: FlashMessagesService,
        private doorService: DoorService,
        private router: Router,
    ) {
        this.addDoorForm = fb.group({
            'name': [null, Validators.required],
            'description': [null, Validators.required],
            'address': [null, Validators.required],
            'startDate': [null, Validators.required],
            'endDate': [null, Validators.required],
        });
    }

    ngOnInit(): void {
        if (localStorage.getItem('jwt')) {
            this.doorService.findDoorsById(localStorage.getItem('username'))
                .then(
                (res: any) => {
                    this.displayDoors(res.doors);
                });
        } else {
            this._flashMessagesService.show(`You are not authorized to view this page !`, { cssClass: 'alert-danger', timeout: 2000 });
            this.router.navigate(['/login']);
        }
    }

    toggleForm() {
        let x = document.getElementById('form-add');
        if (x.style.display === 'none') {
            x.style.display = 'block';
        } else {
            x.style.display = 'none';
        }
    }

    addDoor(addDoorForm: any) {
        this.model = addDoorForm.value;
        let door = new Door();
            door.name = this.model.name;
            door.description = this.model.description;
            door.address = this.model.address;
            door.startDate = this.model.startDate;
            door.endDate = this.model.endDate;
            door.username = localStorage.getItem('username');

        this.doorService.checkIfExists(door)
            .then(
            (res: any) => {
                if (res.success === true) {
                    // TODO : Essayer de trouver une meilleur solution.
                    window.location.reload();
                    this._flashMessagesService
                        .show(
                            `Door information added with success !`,
                            { cssClass: 'alert-success', timeout: 2000 });
                }
            }
            )
            .catch(error => {
                console.log(error);
            });
    }

    displayDoors(doorsInfoList: any) {
        for (let info of doorsInfoList) {
            this.doorInfo.push({
                id: info._id,
                name: info.name,
                description: info.description,
                address: info.address,
                startDate: info.startDate,
                endDate: info.endDate
            });
        }
    }

    openDoor(doorId: any) {
        this.doorService.openDoor(doorId)
            .then((res: any) => {
                console.log(res);
            });
    }

    delete(doorId: any) {
        this.doorService.delete(doorId)
            .then((res: any) => {
                if (res.success === true) {
                    // TODO : Essayer de trouver une meilleur solution.
                    window.location.reload();
                    this._flashMessagesService
                        .show(
                            `Door deleted !`,
                            { cssClass: 'alert-success', timeout: 2000 });
                }
            });
    }

    logout() {
        localStorage.removeItem('jwt');
        this.router.navigate(['login']);
    }
}
