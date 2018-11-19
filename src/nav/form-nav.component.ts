import { Component, Input } from '@angular/core';
import { FormNavService } from './form-nav.service';

@Component({
    selector: 'form-nav',
    template: require('./form-nav.component.html'),
    styles: [require('./form-nav.component.scss').toString()]
})

export class FormNavComponent {
    @Input() public config;

    constructor(private ns: FormNavService) {
    }

    public select(index) {
        this.ns.select(index);
    }

    public getSelected() {
        return this.ns.selected;
    }

    public prev() {
        this.select(this.ns.selected - 1)
    }

    public next() {
        this.select(this.ns.selected + 1)
    }

    public disablePrev() {
        return this.ns.selected < 1;
    }

    public disableNext() {
        return this.ns.selected > this.ns.total - 2;
    }
}
