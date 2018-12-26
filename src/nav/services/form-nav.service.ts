import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable()
export class FormNavService {
    public selected = 0;
    private groups = [];
    private watchers = [];

    add(group): void {
        this.groups.push(group);

        if (group.controls) {
            group.controls.forEach((control: AbstractControl) => {
                control.statusChanges.subscribe(() => {
                    group.valid = group.controls.every((ctrl: AbstractControl) => ctrl.valid);
                });
            });
        }

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

}
