import { Component, Input } from '@angular/core';
import { TasksService } from "../../services/tasks.service";
import { StateService } from "@uirouter/core";

@Component({
    selector: 'task-details',
    template: require('./task-details.component.html')
})
export class TaskDetailsComponent {
    @Input() task;
    @Input() linkToState;

    public expanded: boolean = true;

    constructor(private tasksService: TasksService, private state: StateService) {
    }

    ngOnInit() {
        this.data = {};

        if (this.task) {
            this.isEditMode = true;
            this.data = Object.assign({}, this.task);
        }
    }

    setStatus(status) {
        this.task.status = status;
        return this.tasksService.update(this.task);

    }

    delete(taskId) {
        let del: any = this.tasksService.delete(taskId);
        this.state.go('tasks');
        return del;
    }
}