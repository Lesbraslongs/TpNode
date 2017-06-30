import {Http} from "@angular/http";
import {User} from "../model/User";
import {Injectable} from "@angular/core";

@Injectable()
export class UserFactory  {

    private baseUrl = "http://localhost:3000/api/v1";

    constructor(private http: Http){}

    checkIfExists(user: User) {
        return this.http.post(`${this.baseUrl}/login`, user)
    }

    registerUser(user: User) {
        return this.http.put(`${this.baseUrl}/login`,user);
    }

}