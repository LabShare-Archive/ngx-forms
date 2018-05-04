import { Component, Input } from '@angular/core';
import { GroupsService } from "../../services/groups.service";
import { StateService } from '@uirouter/core';

@Component({
    selector: 'groups-list',
    template: require('./groups-list.component.html')
})
export class GroupsListComponent {
    @Input() groups;

    constructor( private groupsService: GroupsService, private stateService: StateService ) {
    }

    ngOnInit(){

    }

    removeOne(id: number) {
        let result = confirm('Are you sure you want to delete this group?');
        if (!result) return;
        this.groupsService.removeOne(id)
            .then(() => {
                this.stateService.reload();
            });
    }
}