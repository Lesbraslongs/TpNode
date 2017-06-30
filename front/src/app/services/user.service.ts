import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {User} from "../model/User";


@Injectable()
export class UserService {
    private apiUrl = "http://localhost:3000/api/v1/";
    private headers = new Headers({'Content-Type' : 'application/json'});

    constructor(
        private http: Http
    ){}

    private handleError(error: any): Promise<any> {
        console.error('An error occured', error);
        console.error(Promise.name);
        return Promise.reject(error.message || error);
    };

    postUser(value: any): Promise<User> {
        const url = `${this.apiUrl}/users`;

        return this.http.post(url,value)
            .toPromise()
            .then(
                //TODO set cookies with authorized user
                response => {
                    // return new User(response.id,response.login, response.password);
                    return new User();
                }
            )
            .catch(this.handleError);
    }

    saveUser(user: User){
        const url = `${this.apiUrl}/users`;

        return this.http.put(url,user)
            .toPromise()
            .then()
            .catch(this.handleError)
    }
}
