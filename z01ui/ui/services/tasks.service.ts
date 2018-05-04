import { Injectable, Inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { NgCoreConfig } from 'ls-ng-core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TasksService {
    route: string = '/projects/tasks';
    apiUrl: any;
    private cache = null;

    constructor(@Inject(HttpClient) public http: HttpClient, private ngCoreConfig: NgCoreConfig) {
        this.apiUrl = ngCoreConfig.get('serviceUrl') + this.route;
    }

    async getAll() {
        return this.cache || (this.cache = await this.http.get(this.apiUrl).toPromise());
    }

    async getById(id) {
        let tasks = await this.getAll();

        return tasks.find(obj => obj.id == id);
    }

    async getAllByProject(projectId) {
        return this.http.get(
            `${this.apiUrl}/byProjectId/${projectId}`).toPromise();
    }

    async getOne(id) {
        return this.http.get(`${this.apiUrl}/${id}`).toPromise();
    }

    add(formData) {
        this.cache = null;
        return this.http.post(this.apiUrl, formData).toPromise();
    }

    update(task) {
        return this.http.put(this.apiUrl + '/' + task.id, task).toPromise();
    }

    delete(taskId) {
        return this.http.delete(this.apiUrl + '/' + taskId).toPromise();
    }

}