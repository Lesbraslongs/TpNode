import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Email } from '../model/Email';
import {Http} from '@angular/http';

/**
 * Created by Children on 29/06/2017.
 * Angular service used to manage Email.
 */
@Injectable()
export class EmailService {
    private baseUrl = "http://localhost:8080/api/v1/display";
    constructor(private http: Http) { }
    
    checkIfExists(email: Email){
        return this.http.post(`${this.baseUrl}`, email)
            .toPromise()
            .then( response => response.json())
            .catch(this.handleError);
    }
    
    findAll():any {
        return this.http.get(`${this.baseUrl}`)
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
