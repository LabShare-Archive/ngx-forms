import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { FieldConfig } from '../../models/field-config.interface';

@Component({
    exportAs: 'dynamicForm',
    selector: 'dynamic-form',
    templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent implements OnChanges, OnInit {

    @Input() config: FieldConfig[] = [];
    @Input() model: any;

    // @Output() submit: EventEmitter<any> = new EventEmitter<any>();

    form: FormGroup;

    get controls() { return this.config.filter(({ type }) => type !== 'button'); }
    get changes() { return this.form.valueChanges; }
    get valid() { return this.form.valid; }
    get value() { return this.form.value; }

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        console.log(this.model);
        this.form = this.createGroup();
        if (this.model) {
            this.form.patchValue(this.model);
        }
    }

    ngOnChanges() {
        if (this.form) {
            const controls = Object.keys(this.form.controls);
            const configControls = this.controls.map((item) => item.name);

            controls
                .filter((control) => !configControls.includes(control))
                .forEach((control) => this.form.removeControl(control));

            configControls
                .filter((control) => !controls.includes(control))
                .forEach((name) => {
                    const config = this.config.find((control) => control.name === name);
                    this.form.addControl(name, this.createControl(config));
                });

        }
    }

    createGroup() {
        const group = this.fb.group({});
        this.controls.forEach(control => group.addControl(control.name, this.createControl(control)));
        return group;
    }

    createControl(config: FieldConfig) {
        const { disabled, required, minLength, maxLength, email, min, max, pattern, nullValidator, value } = config;
        let validators = [];
        if (required != undefined && required) { validators.push(Validators.required); }
        if (minLength != undefined) { validators.push(Validators.minLength(minLength)); }
        if (maxLength != undefined) { validators.push(Validators.maxLength(maxLength)); }
        if (email != undefined) { validators.push(Validators.email); }
        if (min != undefined) { validators.push(Validators.min(min)); }
        if (max != undefined) { validators.push(Validators.max(max)); }
        if (pattern != undefined) { validators.push(Validators.pattern(pattern)); }
        if (nullValidator != undefined) { validators.push(Validators.nullValidator); }

        return this.fb.control({ disabled, value }, validators);
    }


    setDisabled(name: string, disable: boolean) {
        if (this.form.controls[name]) {
            const method = disable ? 'disable' : 'enable';
            this.form.controls[name][method]();
            return;
        }

        this.config = this.config.map((item) => {
            if (item.name === name) {
                item.disabled = disable;
            }
            return item;
        });
    }

    setValue(name: string, value: any) {
        this.form.controls[name].setValue(value, { emitEvent: true });
    }

}