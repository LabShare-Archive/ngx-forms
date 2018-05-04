import {Component, OnInit, Input} from '@angular/core';
import {StateService} from '@uirouter/core';
import {MilestonesService} from "../../services/milestones.service";
import * as _ from 'lodash'

@Component({
    selector: 'project-milestones-form',
    templateUrl: './milestones-form.component.html',
    styles: [require('./milestones-form.component.scss').toString()]
})
export class MilestonesFormComponent implements OnInit {
    @Input() milestone;
    @Input() projectId;

    public data;
    private isEditMode: boolean = false;
    private isProcessing: boolean = false;
    private error: string;
    public dueDateinCalendar;
    public completionDateinCalendar;
    public selectedValue;

    constructor(private milestonesService: MilestonesService, private stateService: StateService) {
    }

    ngOnInit() {
        this.data = {
            name: null,
            status: null,
            dueDate: null,
            completionDate: null,
            projectID: this.projectId
        };

        //By default set the default value of status to be incomplete
        this.selectedValue = `Incomplete`;

        if (this.milestone) {
            this.data = Object.assign({}, this.milestone);
            this.isEditMode = true;
            this.data.projectID = this.milestone.projectID;
            this.selectedValue = this.milestone.status;

            this.dueDateinCalendar = this.setDateinCalenadar(this.milestone.dueDate);
            if (this.milestone.completionDate) {
                this.completionDateinCalendar = this.setDateinCalenadar(this.milestone.completionDate);
            }
        }
    }

    submit() {
        this.error = '';
        this.isProcessing = true;

        this.data.dueDate = this.convertDate(this.dueDateinCalendar);
        this.data.status = this.selectedValue;

        this.milestonesService
            .add(this.data)
            .then((id: number) => this.stateService.go('details', {projectId: this.data.projectID}))
            .catch((error) => {
                this.error = error.error;
                console.log('error', error)
            })
            .then(() => this.isProcessing = false);
    }

    update() {
        this.error = '';
        this.isProcessing = true;

        this.data.dueDate = this.convertDate(this.dueDateinCalendar);
        this.data.completionDate = this.convertDate(this.completionDateinCalendar);
        this.data.status = this.selectedValue;

        this.milestonesService
            .update(this.data)
            .then(() => this.stateService.go('details', {projectId: this.milestone.projectID}))
            .catch((error) => {
                this.error = error.error;
                console.log('error', error)
            })
            .then(() => this.isProcessing = false);
    }

    convertDate(dateModel) {
        if (_.isEmpty(dateModel)) {
            return;
        }

        let year = dateModel.year.toString(),
            month = dateModel.month.toString().padStart(2, '0'),
            day = (dateModel.day).toString().padStart(2, '0');
        return year + '-' + month + '-' + day;
    }

    setDateinCalenadar(dateString) {
        if (!dateString) {
            return;
        }
        let year = parseInt(dateString.substr(0, 4), 10),
            month = parseInt(_.trim(dateString.substr(5, 2), '0'), 10),
            day = parseInt(_.trim(dateString.substr(8, 2), '0'), 10);

        return {
            year, month, day
        }
    }

    goBack() {
        if (this.milestone) {
            // Go back from edit milestone page
            this.stateService.go('details', {projectId: this.milestone.projectID});
        } else {
            // Go back from add milestone page
            this.stateService.go('details', {projectId: this.projectId});
        }
    }
}