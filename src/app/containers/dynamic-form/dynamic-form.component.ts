import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';

import { FieldConfig } from '../../models/field-config.interface';
import { DataService } from '../../services/data.service';
import { ObserverService } from "../../services/observer.service";

import { Events } from '../../models/events';

@Component({
    exportAs: 'dynamicForm',
    selector: 'dynamic-form',
    template: require('./dynamic-form.component.html')
})
export class DynamicFormComponent implements OnChanges, OnInit {

    @Input() fieldsConfig: FieldConfig[] = [];
    @Input() model: any;
    @Input() dataProvider: object;
    @Input() formsConfig;

    public form: FormGroup;
    public showFormLabelName: string;  //label name of the form to show

    get controls() { return this.fieldsConfig.filter(({ type }) => type !== 'button'); }
    get changes() { return this.form.valueChanges; }
    get valid() { return this.form.valid; }
    get value() { return this.form.value; }

    constructor(private fb: FormBuilder, private dataService: DataService, private observerService: ObserverService) {
          this.observerService.on(Events.SELECT_FORM_TAB, (events)=> {
               this.showFormLabelName = events.value;
          })
    }

    ngOnInit() {
        this.dataService.set(this.dataProvider);
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
                    const config = this.fieldsConfig.find((control) => control.name === name);
                    this.form.addControl(name, this.createControl(config));
                });

        }
    }

  /**
   * @description create FormGroup and FormControl for all general field, exclude custom field
   * @return {FormGroup}
   */
    createGroup() {
        const group = this.fb.group({});
        this.controls.forEach(control => {
          if (!control.custom)  group.addControl(control.name, this.createControl(control));
        });
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

    isShow(label) {
      return label == this.showFormLabelName;
    }

}
