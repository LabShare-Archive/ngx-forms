import { Injectable } from '@angular/core';
import {Constants} from '../../app/models/enums';

@Injectable()
export class FormNavService {
    public selected = 0;
    private groups = [];
    private watchers = [];
    private isValid: boolean;

    add(group): void {
        this.groups.push(group);
        if (this.groups.length > 1) { group.hidden = true; }
        this.watchers.forEach(w => w.groups = this.groups);
    }

    select(index: any): void {
        this.groups.forEach((group) => {
            group.hidden = true;
        });
        this.groups[index].hidden = false;
        this.selected = index;
    }

    reset() {
        this.groups.forEach((group) => {
            group.hidden = false;
        });
        this.groups = [];
        this.selected = 0;
    }

    addWatcher(ref: { groups: any[]; }): any {
        this.watchers.push(ref);
    }

    getAllGroups(): any[] {
        return this.groups;
    }

    createStatusKeyArray(form: any): any[] {
      const currentControls = Object.keys(form.controls).map(function(key) {
          return [(key), form.controls[key].status];
        });
      const  validArrayWithStatus = currentControls.filter(currentControl => currentControl.includes(Constants.VALID));
      return [].concat.apply([], validArrayWithStatus);
    }

    isSubSet(subsets: Array<any>, superSets: Array<any>): boolean {
      return subsets.every(subsetElement => superSets.indexOf(subsetElement) >= 0);
    }
}
