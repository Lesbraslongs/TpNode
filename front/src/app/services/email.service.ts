import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Email } from '../model/Email';
import {Http} from '@angular/http';

/**
 * Created by Children on 29/06/2017.
 * Angular service used to manage Email.
 */
@Injectable()
export class EmailService {
    private emailUrl = 'api/v1/emails';  // URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});
 
    constructor(private http: Http) { }
     
    findAll() {
        return this.http.get(this.emailUrl)
                 .toPromise()
                 .then(response => response.json().data as Email[]);
    }
    
    findById(id : number) {
        const url = `${this.emailUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Email);
    }
    
    create(name: string, firstname: string, domain: string) {
        return this.http
          .post(this.emailUrl, JSON.stringify({name: name, firstname: firstname, domain: domain}), {headers: this.headers})
          .toPromise()
          .then(res => res.json().data as Email);
    }
    
    update(email: Email) {
        const url = `${this.emailUrl}/${email.id}`;
        return this.http
            .put(url, JSON.stringify(email), {headers: this.headers})
            .toPromise()
            .then(() => email);
    }
    
    delete(id: number) {
        const url = `${this.emailUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null);
    }
}
