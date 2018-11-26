import { Injectable, ElementRef } from "@angular/core";

@Injectable()
export class FormNavService {
    public selected = 0;
    private groups = [];
    private watchers = [];

    add(group): void {
        this.groups.push(group);
        if (this.groups.length > 1)
            group.hidden = true;
        this.watchers.forEach(w => w.groups = this.groups)
    }

    select(index: any): void {
        this.groups.forEach((group) => {
            group.hidden = true;
        });
        this.groups[index].hidden = false;
        this.selected = index;
    }

    reset() {
        this.groups = [];
    }

    addWatcher(ref: { groups: any[]; }): any {
        this.watchers.push(ref);
    }

}
