import { Injectable, Inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { NgCoreConfig } from 'ls-ng-core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProjectsService {
    route: string = '/projects/projects';
    apiUrl: any;
    private cache = null;

    constructor(@Inject(HttpClient) public http: HttpClient, private ngCoreConfig: NgCoreConfig) {
        this.apiUrl = ngCoreConfig.get('serviceUrl') + this.route;
    }

    async getAll() {
        return this.cache || (this.cache = await this.http.get(this.apiUrl).toPromise());
    }

    async getById(id) {
        let projects = await this.getAll();
        return projects.find(obj => obj.id == id);
    }

    add(formData) {
        this.cache = null;
        return this.http.post(this.apiUrl, formData).toPromise();
    }

    update(formData) {
        this.cache = null;
        return this.http.put(this.apiUrl + '/' + formData.id, formData).toPromise();
    }

    uploadDocument(formData) {
        this.cache = null;
        return this.http.post(this.apiUrl + '/uploadDocument', formData).toPromise();
    }

}