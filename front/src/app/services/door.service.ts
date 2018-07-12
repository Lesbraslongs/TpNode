import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Door } from '../model/Door';
import {Http} from '@angular/http';

@Injectable()
export class DoorService {
    private baseUrl = 'http://localhost:8080/api/v1/doors/';
    constructor(private http: Http) { }

    checkIfExists(door: Door) {
        return this.http.post(`${this.baseUrl}${door.username}`, door)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    findDoorsById(username: String): any {
        return this.http.get(`${this.baseUrl}${username}`)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    openDoor(doorId: String): any {
      return this.http.get(`${this.baseUrl}${doorId}/open`)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    delete(doorId: String): any {
      return this.http.delete(`${this.baseUrl}${doorId}`)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occured', error);
        console.error(Promise.name);
        return Promise.reject(error.message || error.toJSON());
    };
}
