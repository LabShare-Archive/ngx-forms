import { Component, Input } from '@angular/core';
import { TasksService } from "../../services/tasks.service";
import { StateService } from "@uirouter/core";
import { SessionService } from "../../services/session.service";
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'task-edit',
    template: require('./task-form.component.html')
})
export class TaskFormComponent {
    @Input() task;
    @Input() linkToState;
    @Input() projectId;
    @Input() currentUser;

    public data;
    public expanded: boolean = true;
    private isEditMode: boolean = false;

    constructor(private tasksService: TasksService, private stateService: StateService, private sessionService: SessionService, private usersService: UsersService) {
    }

    ngOnInit() {
        this.data = {};

        if (this.task) {
            this.isEditMode = true;
            this.data = Object.assign({}, this.task);
        }
    }

    save() {
        this.tasksService.update(this.data)
            .then(() => this.stateService.go('details', {projectId: this.data.projectID}))
            .catch((error) => {
                console.log('error', error)
            });
    }

    delete() {
        this.tasksService.delete(this.data.id)
            .then(() => this.stateService.go('details', {projectId: this.data.projectID}));
    }

    cancel() {
        let projectId = this.projectId || this.data.projectID;
        this.stateService.go('details', {projectId: projectId});
    }

    setStatus(status) {
        this.data.status = status;
    }

    create() {
        this.data.projectID = this.projectId;
        this.data.userID = this.data.assignee[0].id;
        this.data.status = 'To Do';
        this.tasksService.add(this.data)
            .then(() => this.stateService.go('details', {projectId: this.projectId}));
    }
}