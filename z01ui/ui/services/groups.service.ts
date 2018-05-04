import { Injectable, Inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { NgCoreConfig } from "ls-ng-core";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GroupsService {
    private apiUrl: string;

    constructor(@Inject(HttpClient) public http: HttpClient,
        private ngCoreConfig: NgCoreConfig) {
        this.apiUrl = ngCoreConfig.get('serviceUrl') + '/projects/groups';
    }

    async add(group) {
        return this.http.post(this.apiUrl, group).toPromise();
    }

    async update(group) {
        return this.http.put(`${this.apiUrl}/${group.id}`, group).toPromise();
    }

    async getOne(id) {
        return this.http.get(`${this.apiUrl}/${id}`).toPromise();
    }

    async getAll() {
        return this.http.get(this.apiUrl).toPromise();
    }

    async removeOne(id) {
        return this.http.delete(`${this.apiUrl}/${id}`).toPromise();
    }

}