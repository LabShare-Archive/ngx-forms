'use strict';

import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'project-header',
    template: require('./header.component.html'),
    styles: [require('./header.component.scss').toString()]
})

export class HeaderComponent implements OnInit {
    @Input() headerData;
    @Input() currentUser;

    private content = {};

    constructor() {
    }

    ngOnInit() {
        console.log('Current User ', this.currentUser);
        if (!this.headerData) return;
        this.content = this.headerData || {};
    }

}