import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { IFieldConfig } from '../../models/field-config.interface';
import { DynamicFieldService } from '../../services/dynamic-field.service';
import { FieldConfigService } from '../../services/field-config.service';

interface IFormConfig {
    form: any;
    fields: IFieldConfig[];
}

@Component({
    exportAs: 'dynamicForm',
    selector: 'dynamic-form',
    template: require('./dynamic-form.component.html'),
    styles: [require('./dynamic-form.component.scss').toString()]
})
export class DynamicFormComponent implements OnChanges, OnInit {
    @Input() formConfig: IFormConfig; // IFieldConfig[] = [];
    @Input() model: any;
    @Input() dataProvider: object;
    @Input() lookups: object;

    public form: FormGroup;

    get controls() { return this.formConfig.fields.filter(({ type }) => type !== 'button'); }
    get changes() { return this.form.valueChanges; }
    get valid() { return this.form.valid; }
    get value() { return this.form.value; }

    constructor(private fb: FormBuilder, private fieldConfigService: FieldConfigService) { }

    public ngOnInit() {
        this.form = this.fb.group({});
        this.controls.forEach(control => {
            this.form.addControl(control.name, this.createControl(control));
        });
        if (this.model) {
            this.form.patchValue(this.model);
        }
        this.formConfig.fields.forEach(field => {
            if (field.lookup && this.lookups.hasOwnProperty(field.lookup)) {
                field.options = this.lookups[field.lookup];
                if (field.extract) { field.options = field.options.map(f => f[field.extract]); }
            }
        });
        this.fieldConfigService.addFields(this.formConfig.fields);

        for (const group of this.formConfig.form) {
            let groupFields = [];
            if (group.fields) {
                groupFields = groupFields.concat(group.fields);
            }
            if (group.panels) {
                group.panels.forEach(panel => { if (panel.fields) { groupFields = groupFields.concat(panel.fields); } });
            }
            group.controls = groupFields.map(f => this.form.get(f));
        }
        // this.form.disable();
    }

    public ngOnChanges() {
        if (this.form) {
            const controls = Object.keys(this.form.controls);
            const configControls = this.controls.map((item) => item.name);

            controls
                .filter((control) => !configControls.includes(control))
                .forEach((control) => this.form.removeControl(control));

            configControls
                .filter((control) => !controls.includes(control))
                .forEach((name) => {
                    const cfg = this.formConfig.fields.find((control) => control.name === name);
                    this.form.addControl(name, this.createControl(cfg));
                });
        }
    }

    public createControl(cfg: IFieldConfig): FormControl {
        const { disabled, required, minLength, maxLength, email, min, max, pattern, value } = cfg;
        const validators = [];
        if (required !== undefined && required) { validators.push(Validators.required); }
        if (minLength !== undefined) { validators.push(Validators.minLength(minLength)); }
        if (maxLength !== undefined) { validators.push(Validators.maxLength(maxLength)); }
        if (email !== undefined) { validators.push(Validators.email); }
        if (min !== undefined) { validators.push(Validators.min(min)); }
        if (max !== undefined) { validators.push(Validators.max(max)); }
        if (pattern !== undefined) { validators.push(Validators.pattern(pattern)); }

        return this.fb.control({ disabled, value }, validators);
    }

    public setValue(name: string, value: any) {
        this.form.controls[name].setValue(value, { emitEvent: true });
    }
}
