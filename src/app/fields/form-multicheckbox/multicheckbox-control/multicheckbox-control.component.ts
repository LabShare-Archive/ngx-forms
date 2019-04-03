import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    providers: [
        {
            multi: true,
            provide: NG_VALUE_ACCESSOR,
            useExisting: MulticheckboxControlComponent
        },
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: MulticheckboxControlComponent
        }
    ],
    selector: 'multicheckbox-control',
    template: require('./multicheckbox-control.component.html')
})
export class MulticheckboxControlComponent implements ControlValueAccessor, Validator, OnInit, OnDestroy {
    public localGroup = new FormGroup({
        inputs: new FormArray([])
    });
    public inputs = this.localGroup.controls.inputs as FormArray;
    private subscriptions: Subscription[] = [];

    @Input() options: any[];

    constructor() {
        this.subscriptions.push(this.localGroup.valueChanges.subscribe(value => {
            const res = this.options.filter((v, i) => value.inputs[i]);
            setTimeout(() => {
                this.onModelChange(res);
            });
        }));
    }

    ngOnInit() {
        this.options.forEach(o => this.inputs.push(new FormControl(false)));
    }

    onModelChange = (model: any) => { };
    onModelTouched = (model: any) => { };

    writeValue(val: string[]) {
        if (val) {
            this.options.forEach((o, index) => this.inputs.controls[index].setValue(val.indexOf(o) > -1));
        }
    }

    registerOnChange(fn: any): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onModelTouched = fn;
    }

    setDisabledState(disabled: boolean): void {
        disabled ? this.localGroup.disable() : this.localGroup.enable();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    validate() {
        const err: {
            required?: boolean,
            invalid?: boolean
        } = {};

        let valid = true;

        const checked = this.inputs.value.some(o => o);
        if (!checked) {
            err.required = true;
            valid = false;
        }

        return valid ? null : err;
    }

}
