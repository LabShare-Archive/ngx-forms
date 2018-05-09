import { Injectable, Inject } from "@angular/core";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataService {

    private dataProvider; 

    set(dataProvider: object) {
        this.dataProvider = dataProvider;
    }

    get(key: string) {
        if (!this.dataProvider[key]) throw new Error(`Data Provider with name "${key}" was not found`);
        return this.dataProvider[key];
    }

}