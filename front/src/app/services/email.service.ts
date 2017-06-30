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
 
    constructor(private http: Http) { }
     
    findAll():any {
        return this.http.get(this.emailUrl);
    }
    
    findById(id : number) {
        const url = `${this.emailUrl}/${id}`;
        return this.http.get(url);
    }
    
    create(name: string, firstname: string, domain: string) {
        return this.http
          .post(this.emailUrl, JSON.stringify({name: name, firstname: firstname, domain: domain}));
    }
    
    update(email: Email) {
        const url = `${this.emailUrl}/${email.id}`;
        return this.http
            .put(url, JSON.stringify(email));
    }
    
    delete(id: number) {
        const url = `${this.emailUrl}/${id}`;
        return this.http.delete(url);
    }
}
