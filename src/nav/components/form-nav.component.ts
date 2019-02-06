import { Component, Input, OnDestroy, AfterContentInit } from '@angular/core';
import { FormNavService } from '../services/form-nav.service';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'form-nav',
    template: require('./form-nav.component.html'),
    styles: [require('./form-nav.component.scss').toString()]
})

export class FormNavComponent implements OnDestroy, AfterContentInit {
    public ref = { groups: [] };
    private subscriptions: Subscription[] = [];

    @Input() form: FormGroup;

    constructor(private ns: FormNavService) {
        ns.addWatcher(this.ref);
    }

    ngAfterContentInit() {
        const x = Object.keys(this.form.controls);

        for (const group of this.ref.groups) {
            let fields = [];
            if (group.fields) {
                fields = fields.concat(group.fields);
            }
            if (group.panels) {
                group.panels.forEach(panel => { if (panel.fields) { fields = fields.concat(panel.fields); } });
            }
            group.controls = fields.filter(f => f.required).map(f => this.form.get(f.name));

            if (group.controls.length === 0) { group.valid = true; } else {
                group.controls.forEach((control: AbstractControl) => {
                    this.subscriptions.push(control.statusChanges.subscribe(() => {
                        group.valid = group.controls.every((ctrl: AbstractControl) => ctrl.valid);
                    }));
                });
            }
        }
    }

    public select(index) {
        this.ns.select(index);
    }

    public getSelected() {
        return this.ns.selected;
    }

    public prev() {
        this.select(this.ns.selected - 1);
    }

    public next() {
        this.select(this.ns.selected + 1);
    }

    public disablePrev() {
        return this.ns.selected < 1;
    }

    public disableNext() {
        return this.ns.selected > this.ref.groups.length - 2;
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
        this.ns.reset();
    }
}
