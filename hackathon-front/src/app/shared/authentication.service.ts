import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
 
@Injectable()
export class AuthenticationService {

    mainUrl: string = window.location.origin
    baseUrl: String = this.mainUrl/*.substring(0,this.mainUrl.lastIndexOf(':')) + ':8000*/ + '/api/'

    emittLogin = new EventEmitter<boolean>();
    constructor(private http: Http) { }


    login(username, password) {
        return this.http.post( this.baseUrl + 'login', { username: username, password: password })
            .map((response: Response) => {
                //if logged will return 200 ok
                this.emittLogin.emit(true);
            })
            .catch((error: any) => Observable.throw(error.json().errors || 'Server error'))
    }
 
    logout() {
        return this.http.get( this.baseUrl + 'logout')
            .map((response: Response) => {
                //if logged will return 200 ok
                this.emittLogin.emit(false);
            })
            .catch((error: any) => Observable.throw(error.json().errors || 'Server error'))
    }
}