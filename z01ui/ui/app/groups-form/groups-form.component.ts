import { Component, OnInit, Input } from '@angular/core';
import { StateService } from '@uirouter/core';
import { GroupsService } from "../../services/groups.service";

@Component({
    selector: 'groups-form',
    templateUrl: './groups-form.component.html',
    styles: [require('./groups-form.component.scss').toString()]
})
export class GroupFormComponent implements OnInit {
    @Input() group;

    public data;
    private isEditMode: boolean = false;
    private isProcessing: boolean = false;
    private error: string;

    constructor(private groupsService: GroupsService, private stateService: StateService) {
    }

    ngOnInit() {
        this.data = {
            title: null,
        };

        if (this.group) {
            this.data = Object.assign({}, this.group);
            this.isEditMode = true;
        }
    }

    submit() {
        this.error = '';
        this.isProcessing = true;

        this.groupsService
            .add(this.data)
            .then((id: number) => this.stateService.go('groups'))
            .catch((error) => {
                this.error = error.error;
                console.log('error', error)
            })
            .then(() => this.isProcessing = false);
    }

    update() {
        this.error = '';
        this.isProcessing = true;

        this.groupsService
            .update(this.data)
            .then(() => this.stateService.go('groups'))
            .catch((error) => {
                this.error = error.error;
                console.log('error', error)
            })
            .then(() => this.isProcessing = false);
    }

    goBack() {
        this.stateService.go('groups');
    }
}