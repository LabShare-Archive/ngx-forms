import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { IFieldConfig } from '../../models/field-config.interface';
import { DataService } from '../../services/data.service';
import { FormComponentType } from '../../models/enums';
import { DynamicFieldService } from '../../services/dynamic-field.service';

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
    public showFormLabelName: string;  // label name of the form to show
    public navConfig;

    get controls() { return this.formConfig.fields.filter(({ type }) => type !== 'button'); }
    get changes() { return this.form.valueChanges; }
    get valid() { return this.form.valid; }
    get value() { return this.form.value; }

    constructor(private fb: FormBuilder, private dataService: DataService, private dynamicFieldService: DynamicFieldService) {
        // this.subscription = this.observerService.on(Events.SELECT_FORM_TAB, (events) => {         // TODO: redo tabs
        //     this.showFormLabelName = events.value;
        // })
    }

    ngOnInit() {
        this.dataService.set(this.dataProvider);
        this.form = this.createForm();
        if (this.model) {
            this.form.patchValue(this.model);
        }
        this.formConfig.fields.forEach(field => {
            if (field.lookup && this.lookups.hasOwnProperty(field.lookup)) {
                field.options = this.lookups[field.lookup];
                if (field.extract) { field.options = field.options.map(f => f[field.extract]); }
            }
        });
        this.navConfig = this.formConfig.form.filter(g => !g.static);
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
                    const cfg = this.formConfig.fields.find((control) => control.name === name);
                    this.form.addControl(name, this.createControl(cfg));
                });

        }
    }

    /**
     * @description create FormGroup and FormControl for all general field, exclude custom field
     * @return {FormGroup}
     */
    createForm() {
        const group = this.fb.group({});
        this.controls.forEach(control => {
            const type = this.dynamicFieldService.getType(control.type);
            switch (type) {
                case FormComponentType.Array:
                    group.addControl(control.name, new FormArray([]));
                    break;
                case FormComponentType.Group:
                    group.addControl(control.name, new FormGroup({}));
                    break;
                default:
                    group.addControl(control.name, this.createControl(control));
            }
        });
        return group;
    }

    createControl(cfg: IFieldConfig): FormControl {
        const { disabled, required, minLength, maxLength, email, min, max, pattern, nullValidator, value } = cfg;
        const validators = [];
        if (required !== undefined && required) { validators.push(Validators.required); }
        if (minLength !== undefined) { validators.push(Validators.minLength(minLength)); }
        if (maxLength !== undefined) { validators.push(Validators.maxLength(maxLength)); }
        if (email !== undefined) { validators.push(Validators.email); }
        if (min !== undefined) { validators.push(Validators.min(min)); }
        if (max !== undefined) { validators.push(Validators.max(max)); }
        if (pattern !== undefined) { validators.push(Validators.pattern(pattern)); }
        if (nullValidator !== undefined) { validators.push(Validators.nullValidator); }

        return this.fb.control({ disabled, value }, validators);
    }

    setDisabled(name: string, disable: boolean) {
        if (this.form.controls[name]) {
            const method = disable ? 'disable' : 'enable';
            this.form.controls[name][method]();
            return;
        }

        this.formConfig.fields = this.formConfig.fields.map((item) => {
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
