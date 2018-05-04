import { Component, Input } from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'project-list',
    template: require('./project-list.component.html'),
    styles: [require('./project-list.component.css').toString()]
})
export class ProjectListComponent {
    @Input() projects;
    @Input() linkToState;

    constructor() {
    }

    public sortNameStatus: Boolean = false;
    public sortTitleStatus: Boolean = false;

    public sortByName () {
        this.sortNameStatus = !this.sortNameStatus;
        if (this.sortNameStatus) {
            this.projects = _.orderBy(this.projects, [project => project.title.toLowerCase()], 'asc');
        } else {
            this.projects = _.orderBy(this.projects, [project => project.title.toLowerCase()], 'desc');
        }

    }

    public sortByTitle () {
        this.sortTitleStatus = !this.sortTitleStatus;
        if (this.sortTitleStatus) {
            this.projects = _.orderBy(this.projects, [project => project.shortOverview.toLowerCase()], 'asc');
        } else {
            this.projects = _.orderBy(this.projects, [project => project.shortOverview.toLowerCase()], 'desc');
        }

    }
}