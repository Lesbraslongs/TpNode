import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Email } from '../model/Email';
import {Http} from '@angular/http';

@Injectable()
export class EmailService {
    private baseUrl = "http://localhost:8080/api/v1/email/";
    constructor(private http: Http) { }
    
    checkIfExists(email: Email){
        return this.http.post(`${this.baseUrl}display`, email)
            .toPromise()
            .then( response => response.json())
            .catch(this.handleError);
    }
    
    findAll():any {
        return this.http.get(`${this.baseUrl}display`)
            .toPromise()
            .then( response => response.json())
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occured', error);
        console.error(Promise.name);
        return Promise.reject(error.message || error);
    };
}
