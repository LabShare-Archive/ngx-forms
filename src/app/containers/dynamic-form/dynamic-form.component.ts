import { Component, Input, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { IFieldConfig } from '../../models/field-config.interface';
import { DataService } from '../../services/data.service';
import { Events } from '../../models/events';
import { ISubscription } from "rxjs/Subscription";
import { FormInputComponent } from '../../components/form-input/form-input.component';
import { FormSelectComponent } from '../../components/form-select/form-select.component';
import { FormTextEditorComponent } from '../../components/form-text-editor/form-text-editor.component';
import { FormCheckboxComponent } from "../../components/form-checkbox/form-checkbox.component";
import { FormRadioComponent } from "../../components/form-radio/form-radio.component";
import { FormTextareaComponent } from '../../components/form-textarea/form-textarea.component';
import { FormInputHidden } from '../../components/form-hidden/form-hidden.component';
import { FormUserComponent } from '../../components/form-user/form-user.component';

import { FormComponentType } from '../../models/enums';
import { DynamicFieldService } from '../../services/dynamic-field.service';

@Component({
    exportAs: 'dynamicForm',
    selector: 'dynamic-form',
    template: require('./dynamic-form.component.html'),
    styles: [require('./dynamic-form.component.scss').toString()]
})
export class DynamicFormComponent implements OnChanges, OnInit, OnDestroy {

    @Input() fieldsConfig: IFieldConfig[] = [];
    @Input() model: any;
    @Input() dataProvider: object;
    @Input() formsConfig;
    @Input() lookups: object;

    public form: FormGroup;
    public showFormLabelName: string;  //label name of the form to show
    public subscription: ISubscription;

    get controls() { return this.fieldsConfig.filter(({ type }) => type !== 'button'); }
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
        this.fieldsConfig.forEach(field => {
            if (field.lookup && this.lookups.hasOwnProperty(field.lookup)) {
                field.options = this.lookups[field.lookup];
                if (field.extract) field.options = field.options.map(f => f[field.extract]);
            }
        });
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
                    const config = this.fieldsConfig.find((control) => control.name === name);
                    this.form.addControl(name, this.createControl(config));
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
            let type = this.dynamicFieldService.getType(control.type)
            switch (type) {
                case FormComponentType.Array:
                    group.addControl(control.name, new FormArray([]));
                    break;
                case FormComponentType.Group:
                    group.addControl(control.name, new FormGroup({}))
                    break;
                default:
                    group.addControl(control.name, this.createControl(control))
            }
        });
        return group;
    };

    createControl(config: IFieldConfig): FormControl {
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

        this.fieldsConfig = this.fieldsConfig.map((item) => {
            if (item.name === name) {
                item.disabled = disable;
            }
            return item;
        });
    }

    setValue(name: string, value: any) {
        this.form.controls[name].setValue(value, { emitEvent: true });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}

export const Components = [FormInputComponent, FormSelectComponent, FormTextEditorComponent, FormTextareaComponent, FormInputHidden, FormUserComponent, FormRadioComponent, FormCheckboxComponent];
