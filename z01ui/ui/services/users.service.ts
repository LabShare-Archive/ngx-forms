import { Injectable, Inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { NgCoreConfig } from "ls-ng-core";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UsersService {
    private apiUrl: any;

    constructor(@Inject(HttpClient) public http: HttpClient, private ngCoreConfig: NgCoreConfig) {
        this.apiUrl = ngCoreConfig.get('serviceUrl') + '/projects/users';
    }

    search(term) {
        return this.http.get(this.apiUrl + '/search/' + term).toPromise();
    }

}