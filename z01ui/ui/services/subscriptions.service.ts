import { Injectable, Inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Project } from "../models/project";
import { Subscription } from "../models/subscriptions";
import { NgCoreConfig } from "ls-ng-core";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SubscriptionsService {
    private route: string = '/projects/subscriptions/';
    private apiUrl: string;
    private cache: Project[] = null;

    constructor(@Inject(HttpClient) public http: HttpClient, private ngCoreConfig: NgCoreConfig) {
        this.apiUrl = ngCoreConfig.get('serviceUrl') + this.route;
    }

    async check(projectId: number): Promise<boolean> {
        let subs = await this.getSubscribedProjects();
        return subs.some(s => s.id == projectId);
    }

    async subscribe(projectId: number) {
        this.cache = null;
        await this.http.get(this.apiUrl + 'subscribe/' + projectId).subscribe();
        this.getSubscribedProjects();
    }

    async unsubscribe(projectId: number) {
        this.cache = null;
        await this.http.get(this.apiUrl + 'unsubscribe/' + projectId).subscribe();
        this.getSubscribedProjects();
    }

    async getSubscribedProjects(): Promise<Project[]> {
        return this.cache || (this.cache = await this.http.get(this.apiUrl + 'subscribed').toPromise() as Project[])
    }

}