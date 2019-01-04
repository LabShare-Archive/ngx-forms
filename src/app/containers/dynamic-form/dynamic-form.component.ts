import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFieldConfig, ILookup } from '../../types';

interface IFormConfig {
    form: any;
}

@Component({
    exportAs: 'dynamicForm',
    selector: 'dynamic-form',
    template: require('./dynamic-form.component.html'),
    styles: [require('./dynamic-form.component.scss').toString()]
})
export class DynamicFormComponent implements OnInit {
    @Input() formConfig: IFormConfig;
    @Input() model: any;
    @Input() lookups: object;

    public form: FormGroup;
    get changes() { return this.form.valueChanges; }
    get valid() { return this.form.valid; }
    get value() { return this.form.value; }

    public ngOnInit(): void {
        this.form = new FormGroup({});

        let fields: IFieldConfig[] = [];
        this.formConfig.form.forEach(gr => {
            if (gr.fields) { fields = fields.concat(gr.fields); }
            if (gr.panels) {
                gr.panels.forEach(panel => {
                    if (panel.fields) { fields = fields.concat(panel.fields); }
                });
            }
        });

        fields.forEach((field: IFieldConfig) => {

            if (field.lookup && this.lookups) {
                const cfg = typeof field.lookup === 'string' ? { name: field.lookup, extract: null } as ILookup : field.lookup as ILookup;
                field.options = cfg.extract ? this.lookups[cfg.name].map(l => l[cfg.extract]) : this.lookups[cfg.name];
                return;
            }

            // TODO: this code is for cases when multiple lookups required the same time
            // if (field.lookups && Array.isArray(field.lookups) && this.lookups) {
            //     field.options = field.lookups
            //         .map(obj => typeof obj === "string" ? { name: obj } : obj as ILookup)
            //         .map(obj =>
            //             obj.extract ? this.lookups[obj.name].map(l => l[obj.extract]) : this.lookups[obj.name]);
            // }

        });


    }
}
