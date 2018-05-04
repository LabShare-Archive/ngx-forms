import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'project-details',
    template: require('./project-details.component.html'),
    styles: [require('./project-details.component.scss').toString()]
})

export class DetailsComponent implements OnInit {
    @Input() project;

    ngOnInit() {
        console.log(this.project)
        this.project.keywordsArr = this.project.keywords.split(';');
        this.project.nidbLink = this.project.nidbLink.indexOf(',') != -1 ? this.project.nidbLink.split(',').pop() : this.project.nidbLink;
    }
}