import { Component, Input } from '@angular/core';

@Component({
    selector: 'task-list',
    template: require('./task-list.component.html')
})
export class TaskListComponent {

    @Input() projectTasks;
    @Input() linkToState;

    constructor() {
    }
}