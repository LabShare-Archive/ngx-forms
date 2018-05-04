import { Injectable, Inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { NgCoreConfig } from "ls-ng-core";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MilestonesService {
    private apiUrl: string;

    constructor(@Inject(HttpClient) public http: HttpClient,
        private ngCoreConfig: NgCoreConfig) {
        this.apiUrl = ngCoreConfig.get('serviceUrl') + '/projects/milestones';
    }

    async getAllByProject(projectId) {
        return this.http.get(
            `${this.apiUrl}/byProjectId/${projectId}`).toPromise();
    }

    async add(milestone) {
        return this.http.post(this.apiUrl, milestone).toPromise();
    }

    async update(milestone) {
        return this.http.put(
            `${this.apiUrl}/${milestone.id}`, milestone).toPromise();
    }

    async getOne(id) {
        return this.http.get(
            `${this.apiUrl}/${id}`).toPromise();
    }

    async removeOne(id) {
        return this.http.delete(
            `${this.apiUrl}/${id}`).toPromise();
    }

}