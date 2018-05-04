import { Injectable, Inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { NgCoreConfig } from "ls-ng-core";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PreferenceService {
    private cache = null;
    private route: string = '/projects/preferences/';
    private apiUrl: any;

    constructor(@Inject(HttpClient) public http: HttpClient, private ngCoreConfig: NgCoreConfig) {
        this.apiUrl = ngCoreConfig.get('serviceUrl') + this.route;
    }

    async get(componentName: string) {
        if (!this.cache) this.cache = await this.http.get(this.apiUrl).toPromise();
        return this.cache.hasOwnProperty(componentName);
    }

    async set(componentName: string, value: boolean) {
        this.cache[componentName] = value;
        for (let key in this.cache) {
            if (!this.cache[key]) delete this.cache[key];
        }
        this.http.post(this.apiUrl, this.cache, { responseType: 'text' }).subscribe();
    }

}